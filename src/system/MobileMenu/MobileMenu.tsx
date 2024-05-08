/** @jsxImportSource theme-ui */

import React, { forwardRef } from 'react';
import { BiMenu } from 'react-icons/bi';

import * as Drawer from '../Drawer/Drawer';
import { DialogCloseDefault } from '../NewDialog/DialogClose';
import { Logo } from '../Toolbar/Logo';
import { Button, Flex, Nav, Box } from '../index';

export interface MobileMenuProps {
	children: React.ReactNode;
	toolbarItems?: React.ReactNode;
}

export const MobileMenu = forwardRef< HTMLDivElement, MobileMenuProps >(
	( { children, toolbarItems }, ref ) => (
		<Drawer.Content
			variant="left"
			label="Main Navigation Items"
			ref={ ref }
			renderClose={ () => <DialogCloseDefault variant="inverse" /> }
		>
			<Box
				sx={ {
					backgroundColor: 'toolbar.background',
					boxShadow: 'none',
					gap: 4,
				} }
			>
				<Flex
					sx={ {
						flexWrap: 'wrap',
						height: 64,
						width: '100%',
						py: 0,
						px: 5,
						gap: 7,
						alignItems: 'center',
					} }
				>
					<Logo />
				</Flex>

				<div
					sx={ {
						overflowX: 'hidden',
						overflowY: 'auto',
						height: '100%',
						maxHeight: 'calc(100vh - 169px)', // 64px (toolbar) + 105px (Header black menu)
						display: 'flex',
						flex: 1,
					} }
				>
					<Flex sx={ { width: '100%', flexDirection: 'column' } }>
						{ toolbarItems && (
							<Nav.PrimaryInverse label="Main Links" orientation="vertical">
								{ toolbarItems }
							</Nav.PrimaryInverse>
						) }

						<Box
							sx={ {
								alignSelf: 'stretch',
								backgroundColor: 'layer.1',
								minHeight: `calc(100vh - 64px)`,
								gap: 4,
								width: '100%',
								a: {
									border: 'none',
								},
							} }
						>
							{ children }
						</Box>
					</Flex>
				</div>
			</Box>
		</Drawer.Content>
	)
);

export const MobileMenuWrapper = ( { children }: MobileMenuProps ) => (
	<Drawer.Root>{ children }</Drawer.Root>
);

type MobileMenuTriggerDisplayProp = 'none' | 'flex';
type MobileMenuTriggerProps = {
	label: string;
	variant?: 'primary' | 'inverse';
	display?: MobileMenuTriggerDisplayProp[];
};

export const MobileMenuTrigger = ( {
	label = 'Menu',
	variant = 'primary',
	display = [ 'none', 'flex', 'flex', 'none' ],
}: MobileMenuTriggerProps ) => (
	<Drawer.Trigger>
		<Button
			type="button"
			variant="tertiary"
			sx={ {
				display,
				alignItems: 'center',
				color:
					variant === 'inverse' ? 'button.primary.label.default' : 'button.tertiary.label.default',
				width: 38,
				height: 38,
				p: 0,
			} }
			aria-label={ label }
		>
			<BiMenu size={ 16 } role="presentation" />
		</Button>
	</Drawer.Trigger>
);
