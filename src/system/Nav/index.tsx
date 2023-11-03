/**
 * Internal dependencies
 */
import {
	NavPrimary as Primary,
	NavSecondary as Secondary,
	NavDisplay as Display,
	NavLink as Link,
	NavTab as Tab,
} from './Nav';

import { ItemPrimary, ItemSecondary, ItemDisplay, ItemLink, ItemTab } from './NavItem';

export const VIP_NAV = 'vip-nav-component';

export const Nav = {
	Primary,
	Secondary,
	Display,
	Link,
	Tab,
};

export const NavItem = {
	Primary: ItemPrimary,
	Secondary: ItemSecondary,
	Display: ItemDisplay,
	Link: ItemLink,
	Tab: ItemTab,
};
