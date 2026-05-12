/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import React from 'react';
import { Link, LinkProps } from 'theme-ui';

/**
 * Internal dependencies
 */

const VIP_LOGO = 'vip-logo-component';

export interface LogoProps extends LinkProps {
	/** Additional CSS class name for the logo SVG element. */
	className?: string;
	/** The URL the logo links to. */
	href?: string;
}

/**
 * The WordPress VIP logo rendered as an SVG inside a themed link.
 */
export const Logo = ( { className, as = 'a', href }: LogoProps ) => (
	<Link
		sx={ {
			width: 54,
			color: 'toolbar.brand',
			flexShrink: 0,
			display: 'inline-block',
		} }
		href={ href }
		as={ as }
	>
		<svg
			className={ classNames( VIP_LOGO, className ) }
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 393.6 176.6"
			role="img"
			aria-label="WordPress VIP Logo"
			sx={ {
				display: 'block',
				width: '100%',
				height: 'auto',
			} }
		>
			<path
				fill="currentColor"
				d="m88.3,0C39.6,0,0,39.6,0,88.3s39.6,88.3,88.3,88.3,88.3-39.5,88.3-88.3S137.1,0,88.3,0ZM8.8,88.3c0-11.5,2.5-22.5,6.8-32.4l37.8,103.8c-26-13-44.6-39.9-44.6-71.4Zm79.5,79.5c-7.7,0-15.3-1.1-22.5-3.2l23.7-69.2,24.4,66.9c.2.4.4.7.5,1.1-8.1,2.8-16.7,4.4-26.1,4.4Zm11-116.8c4.8-.4,9-.7,9-.7,4.1-.5,3.8-6.8-.5-6.5,0,0-13,.9-21.2.9-7.7,0-20.9-.9-20.9-.9-4.1-.4-4.8,6.3-.5,6.5,0,0,4.1.5,8.3.7l12.2,34-17.2,52-28.6-86c4.8-.4,9-.7,9-.7,4.1-.5,3.8-6.8-.5-6.5,0,0-13,.9-21.2.9-1.6,0-3.2,0-5.2-.2C36.1,23,60.5,8.8,88.2,8.8c20.7,0,39.5,7.9,53.6,20.9h-1.1c-7.7,0-13.3,6.8-13.3,14.2,0,6.5,3.8,12.2,7.7,18.7,2.9,5.2,6.5,12.2,6.5,21.9,0,6.8-2,15.5-6.1,25.7l-7.9,26.3-28.3-85.5Zm29.2,106l24.3-70.1c4.5-11.3,6.1-20.3,6.1-28.4,0-2.9-.2-5.5-.5-8.1,6.3,11.3,9.7,24.3,9.7,38.1-.3,29.1-16.3,54.8-39.6,68.5Z"
			/>
			<path
				fill="currentColor"
				d="m323.7,39.2h33.4c7.2,0,13.1.9,17.8,2.5,4.7,1.6,8.5,3.8,11.1,6.5,2.9,2.7,4.7,5.8,5.8,9.3,1.1,3.4,1.8,7.2,1.8,11,0,4.1-.5,8.1-1.8,11.9-1.1,3.8-3.1,7-5.8,10.1-2.7,2.9-6.5,5.1-11,6.6-4.5,1.6-10.4,2.5-17.5,2.5h-14.7v33.4h-19.2V39.2h.1Zm33.3,44.1c3.4,0,6.3-.4,8.5-1.1,2.4-.7,4.1-1.6,5.4-2.9,1.3-1.3,2.1-2.7,2.7-4.5.5-1.8.7-3.8.7-5.9s-.2-4.1-.7-5.8c-.5-1.6-1.4-3.1-2.7-4.1-1.3-1.1-3.1-2-5.4-2.7-2.1-.5-5.1-.9-8.5-.9h-14v27.8h14v.1Z"
			/>
			<path
				fill="currentColor"
				d="m197.5,39.2h21.9l22.8,66.3,23.4-66.3h21l-35.3,93.9h-18.5l-35.3-93.9Z"
			/>
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="m311,39.2h-13.3l-6.3,16.9v76.9h19.6V39.2Z"
			/>
		</svg>
	</Link>
);
