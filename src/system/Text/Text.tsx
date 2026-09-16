/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';
import { Text as ThemeText, TextProps as ThemeTextProps } from 'theme-ui';

type PolymorphicProps< E extends React.ElementType, OwnProps > = OwnProps & { as?: E } & Omit<
		React.ComponentPropsWithRef< E >,
		keyof OwnProps | 'as'
	>;

type PolymorphicRef< E extends React.ElementType > = React.ComponentPropsWithRef< E >[ 'ref' ];

type TextStyleProps = Omit< ThemeTextProps, keyof React.ComponentPropsWithRef< 'p' > | 'as' >;

export type TextOwnProps = TextStyleProps &
	React.AriaAttributes & {
		/** The content displayed inside the text element. */
		children?: React.ReactNode;
		/** Additional CSS class names. */
		className?: string;
	};

export type TextProps< E extends React.ElementType = 'p' > = PolymorphicProps< E, TextOwnProps >;

type TextComponent = {
	< E extends React.ElementType = 'p' >(
		props: TextProps< E > & { ref?: PolymorphicRef< E > }
	): React.ReactElement | null;
	displayName?: string;
};

type ThemeTextRenderProps = ThemeTextProps & {
	ref?: React.Ref< unknown >;
};

const ThemeTextComponent = ThemeText as React.ElementType< ThemeTextRenderProps >;

/**
 * A general-purpose text component that renders a themed paragraph (`<p>`) by default.
 */
const Text = ( < E extends React.ElementType = 'p' >( {
	sx,
	className,
	ref,
	...props
}: TextProps< E > & { ref?: PolymorphicRef< E > } ) => {
	const themeTextProps = {
		as: 'p',
		sx: {
			marginBottom: 2,
			color: 'text',
			...sx,
		},
		className: classNames( 'vip-text-component', className ),
		ref,
		...props,
	} as ThemeTextRenderProps;

	return <ThemeTextComponent { ...themeTextProps } />;
} ) as TextComponent;

Text.displayName = 'Text';

export { Text };
