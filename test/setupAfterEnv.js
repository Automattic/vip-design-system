/**
 * External dependencies
 */
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';
import React from 'react';
import ReactDOM from 'react-dom';

if ( process.env.NODE_ENV !== 'production' ) {
	const axe = require( '@axe-core/react' );

	axe( React, ReactDOM, 1000 );
}
