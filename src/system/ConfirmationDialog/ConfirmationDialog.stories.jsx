/**
 * Internal dependencies
 */
import { Box, ConfirmationDialog, Button, Heading, Text, Flex } from '..';

export default {
	title: 'ConfirmationDialog',
	component: ConfirmationDialog,
};

const ConfirmationTrigger = <Button sx={ { mr: 3 } }>Dangerous Action</Button>;

const ConfirmationContent = (
	<Box p={ 5 }>
		<Heading>This is a Modal</Heading>
		<Text sx={ { fontSize: 3 } }>
			A modal is used to perform more detailed actions that don&lsquo;t necessarily need the context
			behind.
		</Text>
	</Box>
);

export const Default = () => (
	<Flex>
		<Box>
			<ConfirmationDialog trigger={ ConfirmationTrigger } content={ ConfirmationContent } />
		</Box>
	</Flex>
);
