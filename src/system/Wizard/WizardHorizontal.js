/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { MdCheckCircle, MdArrowForward } from 'react-icons/md';

/**
 * Internal dependencies
 */

export const WizardHorizontal = ( { steps, activeStep, ...rest } ) => (
	<div aria-label="progress">
		<ol
			sx={ {
				listStyle: 'none',
				margin: 0,
				padding: 0,
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
			} }
			{ ...rest }
		>
			{ steps.map( ( { title }, index ) => (
				<li
					key={ index }
					aria-current={ index === activeStep || undefined }
					sx={ {
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'row',
					} }
				>
					<span
						sx={ {
							mb: 0,
							color: activeStep === index ? 'heading' : 'muted',
							fontWeight: activeStep === index ? 'bold' : 'normal',
							display: 'flex',
							alignItems: 'center',
						} }
					>
						<MdCheckCircle sx={ { mr: 2, display: 'inline-flex' } } aria-hidden="true" />

						{ title }
					</span>

					{ index < steps.length - 1 && (
						<MdArrowForward
							sx={ { mx: 2, display: 'inline-flex', color: 'grey.80' } }
							aria-hidden="true"
						/>
					) }
				</li>
			) ) }
		</ol>
		{ steps[ activeStep ].children }
	</div>
);

WizardHorizontal.propTypes = {
	steps: PropTypes.array,
	activeStep: PropTypes.number,
};
