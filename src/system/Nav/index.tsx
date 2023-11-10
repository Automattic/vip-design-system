import {
	NavPrimary as Primary,
	NavTab as Tab,
	NavToolbar as Toolbar,
	NavMenu as Menu,
} from './Nav';
import { ItemMenu, ItemPrimary, ItemTab, ItemToolbar } from './NavItem';

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
	Icon: props => <span className="vip-nav-item-icon" { ...props } />,
};
