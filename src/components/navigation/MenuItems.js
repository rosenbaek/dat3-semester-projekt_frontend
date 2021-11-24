import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import homeFill from "@iconify/icons-eva/home-fill";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const MenuValues = [
	{
		titel: "Dashboard",
		path: "/",
		auth: ["user", "admin"],
		icon: getIcon(pieChart2Fill),
	},
	{
		titel: "Admin",
		path: "/admin",
		auth: ["admin"],
		icon: getIcon(lockFill),
	},
	{
		titel: "Protected",
		path: "/protected",
		auth: ["user"],
		icon: getIcon(fileTextFill),
	},
	{
		titel: "Stocks",
		path: "/stocks",
		auth: ["user"],
		icon: getIcon(fileTextFill),
	},
];

export const MENU_OPTIONS = [
	{
		label: "Home",
		icon: homeFill,
		linkTo: "/",
	},
	{
		label: "Profile",
		icon: personFill,
		linkTo: "#",
	},
	{
		label: "Settings",
		icon: settings2Fill,
		linkTo: "#",
	},
];

export default MenuValues;
