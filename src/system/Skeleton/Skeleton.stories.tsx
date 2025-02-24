/**
 * Internal dependencies
 */
import { Skeleton } from '..';

export default {
	title: 'Skeleton',
	component: Skeleton,
};

export const Default = () => <Skeleton />;

export const Grouped = () => <Skeleton times={ 3 } />;

export const Circle = () => <Skeleton variant="circle" width="50px" height="50px" />;

export const Text = () => <Skeleton variant="text" />;
