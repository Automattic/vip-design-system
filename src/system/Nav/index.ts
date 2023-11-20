import {
	NavPrimary as Primary,
	NavTab as Tab,
	NavToolbar as Toolbar,
	NavMenu as Menu,
} from './Nav';
import { ItemMenu, ItemPrimary, ItemTab, ItemToolbar, ItemBreadcrumb } from './NavItem';
import { ItemGroupMenu } from './NavItemGroup';

export const VIP_NAV = 'vip-nav-component';

export const Nav = {
	Primary,
	Tab,
	Toolbar,
	Menu,
};

export const NavItem = {
	Primary: ItemPrimary,
	Tab: ItemTab,
	Toolbar: ItemToolbar,
	Menu: ItemMenu,
	Breadcrumb: ItemBreadcrumb,
	MenuGroup: ItemGroupMenu,
};
