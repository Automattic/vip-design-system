/**
 * External dependencies
 */

import { BiAddToQueue, BiCalendarHeart, BiBellMinus } from 'react-icons/bi';

/**
 * Internal dependencies
 */
import { Box, OptionRow } from '..';

export default {
	title: 'OptionRow',
	component: OptionRow,
};

export const Default = () => (
	<Box>
		<OptionRow
			image={ <BiAddToQueue size={ 24 } /> }
			label="Option Row 1"
			subTitle="Mostly used to link off to other pages."
			as="a"
			href="http://google.com/"
		/>
		<OptionRow
			image={ <BiCalendarHeart size={ 24 } /> }
			label="Option Row 2"
			subTitle="Mostly used to link off to other pages."
			as="a"
			href="http://google.com/"
			order={ 2 }
		/>

		<OptionRow
			image={ <BiBellMinus size={ 24 } /> }
			label="Custom heading HTML h2"
			subTitle="Use the variant prop to adjust the heading structure"
			as="a"
			href="http://google.com/"
			variant="h2"
			meta=""
		/>
	</Box>
);
