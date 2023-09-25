/**
 * External dependencies
 */
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';
import axe from '@axe-core/react';
import React from 'react';
import ReactDOM from 'react-dom';

void axe( React, ReactDOM, 1000 );
