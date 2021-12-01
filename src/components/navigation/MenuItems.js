import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import homeFill from "@iconify/icons-eva/home-fill";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import personFill from "@iconify/icons-eva/person-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";

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
