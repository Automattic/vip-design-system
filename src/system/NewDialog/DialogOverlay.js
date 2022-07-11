/** @jsxImportSource theme-ui */

/**
 * Internal dependencies
 */
import * as Dialog from '@radix-ui/react-dialog';

export const DialogOverlay = props => (
	<Dialog.Overlay
		sx={ {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			inset: 0,
			opacity: 0.7,
			background:
				// eslint-disable-next-line max-len
				'linear-gradient(198.09deg,#E5F0F6 2.01%, rgba(235, 238, 242, 0) 43.18%,rgba(249, 234, 232, 0) 47.86%, #FFE9D1 94.31%), linear-gradient(98.65deg, #FFE8E6 0.58%, rgba(255, 233, 214, 0) 52.45%, rgba(255, 233, 219, 0) 53.76%,#FFE9D1 105.86%), #F5F2F1',
		} }
		{ ...props }
	/>
);
