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
			sx={ { mb: 6 } }
			title="Your site is ready to launch!"
		>
			It looks like you&lsquo;re ready to share your{ ' ' }
			<Link href="https://google.com/">application with the world.</Link>
		</Notice>

		<Notice variant="success" sx={ { mb: 6 } }>
			It looks like you&lsquo;re ready to share your{ ' ' }
			<Link href="https://google.com/">application with the world.</Link>
		</Notice>

		<Notice sx={ { mb: 6 } } title="This notice has only the title prop passed">
			It looks like you&lsquo;re ready to share your{ ' ' }
			<Link href="https://google.com/">application with the world.</Link>
		</Notice>

		<Notice variant="success" sx={ { mb: 6 } } title="You made it!">
			It looks like you&lsquo;re ready to share your{ ' ' }
			<Link href="https://google.com/">application with the world.</Link>
		</Notice>

		<Notice variant="info" sx={ { mb: 6 } } title="Please read this first">
			This notice has a title and children and{ ' ' }
			<Link href="/?path=/story/avatar--default">A link to Avatar</Link>
		</Notice>

		<Notice variant="alert" sx={ { mb: 6 } } title="Please read this first">
			This notice has a title and children and{ ' ' }
			<Link href="/?path=/story/avatar--default">A link to Avatar</Link>
		</Notice>

		<Notice
			variant="alert"
			sx={ { mb: 6 } }
			title="There are errors in your form"
			headingVariant="h2"
		>
			<ul sx={ { mb: 0 } }>
				<li>
					<Link href="#name">Please enter your name.</Link>
				</li>
				<li>
					<Link href="#email">Please enter your email address.</Link>
				</li>
				<li>
					<Link href="#terms">Please agree to the terms.</Link>
				</li>
			</ul>
		</Notice>

		<Notice variant="alert" sx={ { mb: 6 } }>
			Bucket names in Amazon S3 are globally unique, external link ↗. To ensure that shipped data is
			delivered to the correct location, the Bucket Name and Bucket Region entered below must match
			the details used to set up your S3 bucket, external link ↗.
			<Link href="/?path=/story/avatar--default">A link to Avatar</Link>
		</Notice>

		<Notice variant="info" sx={ { mb: 6 } }>
			Bucket names in Amazon S3 are globally unique.
		</Notice>
	</React.Fragment>
);
