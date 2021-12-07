import { Icon } from "@iconify/react";
import lockFill from "@iconify/icons-eva/lock-fill";
import personFill from "@iconify/icons-eva/person-fill";

const getIcon = (name) => <Icon icon={name} width={24} height={24} />;

const MenuValues = [
	{
		titel: "Dashboard",
		path: "/",
		auth: ["user", "admin"],
		icon: getIcon("ic:round-dashboard"),
	},
	{
		titel: "Admin",
		path: "/admin",
		auth: ["admin"],
		icon: getIcon(lockFill),
	},
	{
		titel: "Stocks",
		path: "/stocks",
		auth: ["user"],
		icon: getIcon("clarity:note-edit-solid"),
	},
	{
		titel: "Currencies",
		path: "/protected",
		auth: ["user"],
		icon: getIcon("bi:currency-exchange"),
	},
];

export const MENU_OPTIONS = [
	{
		label: "Profile",
		icon: personFill,
		linkTo: "/user",
	},
];

export default MenuValues;
