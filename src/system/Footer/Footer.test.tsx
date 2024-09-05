import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { Footer } from './Footer';

const links = [
	{
		children: 'Link1',
		href: 'https://wpvip.com/',
	},
	{
		children: 'Link2',
		href: 'https://docs.wpvip.com/',
	},
];

describe( '<Footer />', () => {
	it( 'should accept LinkExternal props for Footer links', () => {
		const moreLinks = [
			{
				children: 'Link3',
				href: 'https://wpvipstatus.com',
				newTab: true,
			},
		];

		const combinedLinks = [ ...links, ...moreLinks ];

		render( <Footer links={ combinedLinks } /> );

		const link1 = screen.getByRole( 'link', { name: /link1/i } );
		const link3 = screen.getByRole( 'link', { name: /link3/i } );

		expect( link1 ).toHaveAttribute( 'target', '_self' );
		expect( link3 ).toHaveAttribute( 'target', '_blank' );
	} );
} );
