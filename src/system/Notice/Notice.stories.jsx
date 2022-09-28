/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import React from 'react';
import { Heading, Notice, Text } from '..';

export default {
	title: 'Notice',
	component: Notice,
};

export const Default = () => (
	<React.Fragment>
		<Notice variant="alert" sx={ { mb: 4 } }>
			<Heading variant="h4">Your site is ready to launch!</Heading>
			<Text sx={ { mb: 0 } }>
				It looks like you&lsquo;re ready to share your application with the world.
			</Text>
		</Notice>

		<Notice variant="success" sx={ { mb: 4 } }>
			It looks like you&lsquo;re ready to share your <a href="#">application with the world.</a>
		</Notice>

		<Notice sx={ { mb: 4 } } title="This notice has only the title prop passed" />

		<Notice variant="success" sx={ { mb: 4 } } title="You made it!">
			<Text sx={ { mb: 0 } }>This notice has a title and children</Text>
		</Notice>

		<Notice variant="alert" sx={ { mb: 4 } }>
			<Heading variant="h4">There are errors in your form</Heading>
			<ul sx={ { mb: 0 } }>
				<li>
					<a href="#name">Please enter your name.</a>
				</li>
				<li>
					<a href="#email">Please enter your email address.</a>
				</li>
				<li>
					<a href="#terms">Please agree to the terms.</a>
				</li>
			</ul>
		</Notice>
	</React.Fragment>
);
