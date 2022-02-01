/**
 * Internal dependencies
 */
import {
	Box,
	Dialog,
	DialogMenu,
	DialogMenuItem,
	DialogDivider,
	Button,
	Heading,
	Text,
	Flex,
} from '..';

export default {
	title: 'Dialog',
	component: Dialog,
};

const DropdownTrigger = <Button>Trigger Dropdown</Button>;
const ModalTrigger = <Button sx={{ mr: 3 }}>Trigger Modal</Button>;
const DialogAndModalTrigger = <Button sx={{ ml: 3 }}>Dropdown + Modal</Button>;
const SidebarTrigger = <Button sx={{ ml: 3 }}>Sidebar</Button>;

const DropdownContent = (
	<div>
		<DialogMenu>
			<DialogMenuItem>Profile</DialogMenuItem>
			<DialogMenuItem>Account</DialogMenuItem>
			<DialogMenuItem>Dark Mode</DialogMenuItem>
		</DialogMenu>
		<DialogDivider />
		<DialogMenu>
			<DialogMenuItem>Logout</DialogMenuItem>
		</DialogMenu>
	</div>
);

const ModalContent = (
	<Box p={5}>
		<Heading>This is a Modal</Heading>
		<Text sx={{ fontSize: 3 }}>
			A modal is used to perform more detailed actions that don&lsquo;t
			necessarily need the context behind.
		</Text>
	</Box>
);

export const Default = () => (
	<Flex>
		<Box>
			<Dialog
				trigger={ModalTrigger}
				content={ModalContent}
				sx={{ width: 480 }}
				variant="modal"
			/>
		</Box>
		<Dialog
			trigger={DropdownTrigger}
			content={DropdownContent}
			sx={{ width: 200 }}
		/>
		<Dialog
			position="right"
			sx={ { width: 240 } }
			trigger={ DialogAndModalTrigger }
			content={
				<div>
					<div>
						<DialogMenu>
							<Dialog
								variant="modal"
								trigger={ <DialogMenuItem>Modal</DialogMenuItem> }
								content={ ModalContent }
							/>
						</DialogMenu>
					</div>
				</div>
			}
		/>
		<Dialog
			variant="sidebar"
			trigger={ SidebarTrigger }
			content={ ModalContent }
		/>
	</Flex>
);
