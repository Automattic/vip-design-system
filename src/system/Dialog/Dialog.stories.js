import React from "react";

import { action } from "@storybook/addon-actions";
import {
	Box,
	Dialog,
	DialogMenu,
	DialogMenuItem,
	DialogDivider,
	Button,
	Heading,
	Text
} from "..";

export default {
	title: "Dialog",
	component: Dialog
};

const DropdownTrigger = <Button>Trigger Dropdown</Button>;
const ModalTrigger = <Button sx={{ mr: 3 }}>Trigger Modal</Button>;
// const Content = (
// 	<Box sx={{ p: 3 }}>
// 		<Heading variant="h4">Hi there,</Heading>
// 		<Text sx={{ mb: 0 }}>
// 			This is a dropdown that can be used in many ways. Its generally used
// 			to conceil actions associated with an object.
// 		</Text>
// 	</Box>
// );

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
			A modal is used to perform more detailed actions that don't
			necessarily need the context behind.
		</Text>
	</Box>
);

export const Default = () => (
	<>
		<Dialog
			trigger={ModalTrigger}
			content={ModalContent}
			sx={{ width: 480 }}
			variant="modal"
		/>
		<Dialog
			trigger={DropdownTrigger}
			content={DropdownContent}
			sx={{ width: 200 }}
		/>
	</>
);
