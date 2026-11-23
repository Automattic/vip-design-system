import {
	Fragment,
	cloneElement,
	forwardRef,
	isValidElement,
	type ComponentPropsWithRef,
	type ReactElement,
	type Ref,
} from 'react';
import { useRender } from '@base-ui/react/use-render';

type DefaultElement = 'div' | 'span' | 'section';
type Render = NonNullable<useRender.ComponentProps<'div'>['render']>;

export type WrapperProps<Default extends DefaultElement, Options> = Options &
	Omit<useRender.ComponentProps<Default>, keyof Options | 'render' | 'ref'> &
	(
		| { render?: undefined; ref?: ComponentPropsWithRef<Default>['ref'] }
		// JSX erases the replacement's type; put element-specific props and refs on it.
		| { render: Render; ref?: Ref<HTMLElement> }
	);

type WrapperComponent<Default extends DefaultElement, Options> = {
	(props: WrapperProps<Default, Options>): ReactElement | null;
	displayName?: string;
};

type AttributeMap<Options> = {
	[Key in keyof Required<Options>]: { attribute: `data-${string}`; presence?: boolean };
};

/** One runtime for generated wrappers; no styling, state, or CSS defaults live here. */
export function createWrapper<Options, Default extends DefaultElement>(
	name: string,
	defaultElement: Default,
	baseClassName: string,
	mapping: AttributeMap<Options>
): WrapperComponent<Default, Options> {
	const attributes = Object.entries(mapping) as [
		string,
		{ attribute: `data-${string}`; presence?: boolean },
	][];
	const Component = forwardRef<HTMLElement, useRender.ComponentProps<'div'>>(
		({ render, className, ...props }, ref) => {
			const rest = { ...props } as Record<string, unknown>;
			const configured: Record<string, unknown> = {};
			for (const [key, { attribute, presence }] of attributes) {
				const value = rest[key];
				delete rest[key];
				// Explicit typed configuration wins over a raw attribute on this wrapper.
				if (value !== undefined)
					configured[attribute] = presence ? (value ? '' : undefined) : value;
			}
			if (isValidElement(render)) {
				if (render.type === Fragment)
					throw new Error(`${name}: render requires an element that can receive props and a ref.`);
				// Preserve configuration precedence on the replacement too. Base UI handles
				// class/style/event/ref merging; a nested wrapper still owns its typed props.
				render = cloneElement(render, configured);
			}
			return useRender({
				defaultTagName: defaultElement,
				render,
				ref,
				props: {
					...rest,
					...configured,
					className: [baseClassName, className].filter(Boolean).join(' '),
				},
			});
		}
	);
	Component.displayName = name;
	// The factory adds catalog-derived props and narrows refs for the default element.
	return Component as WrapperComponent<Default, Options>;
}
