import type { ItemsProp, BreadcrumbsLinkProps } from './Breadcrumbs';

const SEPARATOR_WIDTH = 30;

export const grabItemsVisibility = (
	refLinks: HTMLLIElement[],
	itemsInfo: ItemsProp,
	expanded: boolean
): boolean[] => {
	const { allItemsWidth } = itemsInfo;
	const navWidth = refLinks?.[ 0 ]?.parentElement?.clientWidth ?? 0;
	const allItemsCanFit = expanded ? true : ( allItemsWidth || 0 ) <= navWidth;
	const firstLink = refLinks?.[ 0 ];
	const lastLink = refLinks?.[ refLinks.length - 1 ];
	const initialWidth = firstLink?.clientWidth + lastLink?.clientWidth + SEPARATOR_WIDTH;

	const links = refLinks.reduce< {
		items: boolean[];
		currentTotalWidth: number;
	} >(
		( acc, item ) => {
			const itemFit = acc.currentTotalWidth + item.clientWidth <= navWidth;
			const istFirstOrLast = item === firstLink || item === lastLink;

			acc.items.push( istFirstOrLast || allItemsCanFit || itemFit );
			acc.currentTotalWidth += item.clientWidth;

			return acc;
		},
		{
			items: [],
			currentTotalWidth: initialWidth,
		}
	);

	return links.items;
};

export const breadcrumbLinks = (
	links: BreadcrumbsLinkProps[]
): {
	lastLink: BreadcrumbsLinkProps | null;
	firstLink: BreadcrumbsLinkProps | null;
	otherLinks: BreadcrumbsLinkProps[];
} => {
	const totalLinks = links?.length;
	const firstLink = links?.[ 0 ];
	const lastLink = totalLinks > 1 ? links?.[ totalLinks - 1 ] : firstLink;
	let otherLinks = totalLinks > 1 ? links.slice( 1, totalLinks - 1 ) : [];

	if ( totalLinks === 1 ) {
		otherLinks = [];
	}

	return { firstLink, lastLink, otherLinks };
};

export const getListItemsFromBreadcrumb = (
	breadCrumbRef: React.RefObject< HTMLOListElement >
): HTMLLIElement[] => {
	if ( ! breadCrumbRef?.current ) {
		return [];
	}

	// We cound be using querySelectorAll('li:not(:has(button))) but jsdom does not support it
	return Array.from( breadCrumbRef.current.querySelectorAll( 'li' ) )?.filter(
		li => ! li.querySelector( 'button' )
	);
};
