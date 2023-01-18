/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import React from 'react';
import { Notice, Link } from '..';

export default {
	title: 'Notice',
	component: Notice,
};

export const Default = () => (
	<React.Fragment>
		<Notice
			variant="alert"
			headingVariant="h2"
			sx={ { mb: 4 } }
			title="Your site is ready to launch!"
		>
			It looks like you&lsquo;re ready to share your{ ' ' }
			<Link href="https://google.com/">application with the world.</Link>
		</Notice>

		<Notice variant="success" sx={ { mb: 4 } }>
			It looks like you&lsquo;re ready to share your{ ' ' }
			<Link href="https://google.com/">application with the world.</Link>
		</Notice>

		<Notice sx={ { mb: 4 } } title="This notice has only the title prop passed">
			It looks like you&lsquo;re ready to share your{ ' ' }
			<Link href="https://google.com/">application with the world.</Link>
		</Notice>

		<Notice variant="success" sx={ { mb: 4 } } title="You made it!">
			It looks like you&lsquo;re ready to share your{ ' ' }
			<Link href="https://google.com/">application with the world.</Link>
		</Notice>

		<Notice variant="info" sx={ { mb: 4 } } title="Please read this first">
			This notice has a title and children and{ ' ' }
			<a href="/?path=/story/avatar--default">A link to Avatar</a>
		</Notice>

		<Notice
			variant="alert"
			sx={ { mb: 4 } }
			title="There are errors in your form"
			headingVariant="h2"
		>
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
