/**
 * Internal dependencies
 */
import { Notification } from '..';

export default {
	title: 'Notification',
	component: Notification,
};

export const Default = () => (
	<Notification
		title="Awesome!"
		body="Your message has been sent successfully."
	/>
);
export const Error = () => (
	<Notification
		status="error"
		title="Snag!"
		body="Your message could not be sent."
	/>
);
