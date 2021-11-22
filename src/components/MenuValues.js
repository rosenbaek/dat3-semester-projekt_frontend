import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-eva/lock-fill";

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
];

export default MenuValues;
