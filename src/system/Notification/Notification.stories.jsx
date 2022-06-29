/**
 * Internal dependencies
 */
import { useLayoutEffect, useState } from 'react';
import { Notification } from '..';

export default {
	title: 'Notification',
	component: Notification,
};

export const Default = () => (
	<Notification
		title="My first notification"
		subTitle="Use when providing success or error feedback on global action"
	/>
);

export const Alert = () => {
	const [show, setShow] = useState(false);

	useLayoutEffect(() => {
		setTimeout(() => {
			setShow(true);
		}, 1000);
	}, []);

	if (!show) {
		return null;
	}

	return (
		<Notification
			title="My first notification"
			subTitle="Use when providing success or error feedback on global action"
		/>
	);
};
