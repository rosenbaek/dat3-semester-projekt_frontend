import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import menu2Fill from "@iconify/icons-eva/menu-2-fill";
// material
import { alpha, styled } from "@mui/material/styles";
import { Box, AppBar, Toolbar, IconButton } from "@mui/material";
// components
import HideComponent from "../utility/HideComponent";
import Popover from "./popover/Popover";

// ----------------------------------------------------------------------
const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_MINI = 70;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
	minHeight: APPBAR_MOBILE,
	[theme.breakpoints.up("lg")]: {
		minHeight: APPBAR_DESKTOP,
		padding: theme.spacing(0, 5),
	},
}));

// ----------------------------------------------------------------------

TopBar.propTypes = {
	onOpenSidebar: PropTypes.func,
};

export default function TopBar({
	onOpenSidebar,
	changeLoginStatus,
	isOpenSidebar,
}) {
	const RootStyle = styled(AppBar)(({ theme }) => ({
		boxShadow: "none",
		backdropFilter: "blur(6px)",
		WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
		backgroundColor: alpha(theme.palette.background.default, 0.72),
		[theme.breakpoints.up("lg")]: {
			width: `calc(100% - ${
				isOpenSidebar ? DRAWER_WIDTH + 1 : DRAWER_WIDTH_MINI
			}px)`,
		},
	}));
	return (
		<RootStyle>
			<ToolbarStyle>
				{/* hides below if lgUp or bigger */}
				<HideComponent width="lgUp">
					<IconButton
						onClick={onOpenSidebar}
						sx={{ mr: 1, color: "text.primary" }}
					>
						<Icon icon={menu2Fill} />
					</IconButton>
				</HideComponent>

				{/* Used to align AccountPopover to the right */}
				<Box sx={{ flexGrow: 1 }} />

				<Popover changeLoginStatus={changeLoginStatus} />
			</ToolbarStyle>
		</RootStyle>
	);
}
