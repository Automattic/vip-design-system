/** @jsxImportSource theme-ui */
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import React from 'react';

import { CollapsibleNotice } from './';
import { Link } from '../Link';

export default {
	title: 'CollapsibleNotice',
	component: CollapsibleNotice,
};

export const Default = () => (
	<React.Fragment>
		<CollapsibleNotice headingVariant="h2" sx={ { mb: 4 } } title="Your site is ready to launch!">
			It looks like you&lsquo;re ready to share your{ ' ' }
			<Link href="https://google.com/">application with the world.</Link>
		</CollapsibleNotice>

		<CollapsibleNotice variant="info" sx={ { mb: 4 } } title="Auto-expanded Notice" defaultOpen>
			This notice has the auto-expanded prop set to true.
		</CollapsibleNotice>

		<CollapsibleNotice variant="error" sx={ { mb: 4 } } title="Please read this first">
			This notice has a title and children and{ ' ' }
			<Link href="/?path=/story/avatar--default">A link to Avatar</Link>
		</CollapsibleNotice>

		<CollapsibleNotice variant="success" sx={ { mb: 4 } } title="Please read this first">
			This notice has a title and children and{ ' ' }
			<Link href="/?path=/story/avatar--default">A link to Avatar</Link>
		</CollapsibleNotice>
	</React.Fragment>
);
