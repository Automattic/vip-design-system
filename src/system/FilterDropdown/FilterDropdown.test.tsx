import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';

import { FilterDropdown } from './FilterDropdown';

function getMenu() {
	return screen.getByRole( 'button', { name: 'Filter: Auth Method All checked' } );
}

const props = {
	filters: {
		ALL_USERS: {
			label: 'All',
			authMethod: '',
		},
		WP_USERS: {
			label: 'WP.com',
			authMethod: 'wpcom',
		},
		GH_USERS: {
			label: 'GitHub',
			authMethod: 'github',
		},
		SSO_USERS: {
			label: 'SSO',
			authMethod: 'organization_sso',
		},
		SSO_OTHER_USERS: {
			label: 'SSO (third-party)',
			authMethod: 'other_sso',
		},
		BLOCKED_USERS: {
			label: 'Blocked Auth Methods',
			authMethod: 'restricted',
		},
	},
	label: 'Auth Method',
	onSelect: jest.fn(),
};

describe( '<FilterDropdown />', () => {
	it( 'render with all props passed', () => {
		render( <FilterDropdown { ...props } /> );

		const menu = getMenu();

		expect( menu ).toBeInTheDocument();
		expect( menu ).toHaveTextContent( /Filter:/ );
		expect( menu ).toHaveTextContent( /Auth Method/ );
	} );
} );
