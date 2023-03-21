/**
 * External dependencies
 */

import { BiAddToQueue, BiCalendarHeart, BiBellMinus } from 'react-icons/bi';
import BiAddToQueue from '~icons/bx/add-to-queue';
import BiBellMinus from '~icons/bx/bell-minus';

/**
 * Internal dependencies
 */
import { Box, OptionRow } from '..';

export default {
	title: 'OptionRow',
	component: OptionRow,
};

// eslint-disable-next-line react/prop-types
const Base = ( { variant } ) => (
	<Box>
		<OptionRow
			image={ <BiAddToQueue size={ 24 } /> }
			label="Option Row 1"
			subTitle="Mostly used to link off to other pages."
			as="a"
			href="http://google.com/"
			variant={ variant }
		/>
		<OptionRow
			image={ <BiCalendarHeart size={ 24 } /> }
			label="Option Row 2"
			subTitle="Mostly used to link off to other pages."
			as="a"
			href="http://google.com/"
			order={ 2 }
			variant={ variant }
		/>

		<OptionRow
			image={ <BiBellMinus size={ 24 } /> }
			label="Custom heading HTML h2"
			subTitle="Use the variant prop to adjust the heading structure"
			as="a"
			href="http://google.com/"
			titleVariant="h2"
			meta=""
			variant={ variant }
		/>
	</Box>
);

export const Default = () => <Base />;

export const Alternative = () => <Base variant="alt" />;
