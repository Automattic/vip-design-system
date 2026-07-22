/**
 * External dependencies
 */
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { Box as ThemeBox, BoxProps as ThemeBoxProps } from 'theme-ui';

type PolymorphicProps< E extends React.ElementType, OwnProps > = OwnProps & { as?: E } & Omit<
		React.ComponentPropsWithoutRef< E >,
		keyof OwnProps | 'as'
	>;

type BoxStyleProps = Omit< ThemeBoxProps, keyof React.ComponentPropsWithRef< 'div' > | 'as' >;

export type BoxOwnProps = BoxStyleProps &
	React.AriaAttributes & {
		/** The content displayed inside the box. */
		children?: React.ReactNode;
		/** Additional CSS class names. */
		className?: string;
	};

export type BoxProps< E extends React.ElementType = 'div' > = PolymorphicProps< E, BoxOwnProps >;

type BoxComponent = {
	< E extends React.ElementType = 'div' >(
		props: BoxProps< E > & { ref?: React.Ref< HTMLElement > }
	): React.ReactElement | null;
	displayName?: string;
};

type ThemeBoxRenderProps = ThemeBoxProps & {
	ref?: React.Ref< unknown >;
};

const ThemeBoxComponent = ThemeBox as React.ElementType< ThemeBoxRenderProps >;

const BoxBase = < E extends React.ElementType = 'div' >(
	props: BoxProps< E >,
	ref: React.Ref< HTMLElement >
) => {
	const themeBoxProps = {
		className: classNames( 'vip-box-component', props.className ),
		ref,
		...props,
	} as ThemeBoxRenderProps;

	return <ThemeBoxComponent { ...themeBoxProps } />;
};

const Box = forwardRef(
	BoxBase as React.ForwardRefRenderFunction< HTMLElement, BoxProps< React.ElementType > >
) as BoxComponent;

Box.displayName = 'Box';

export { Box };
