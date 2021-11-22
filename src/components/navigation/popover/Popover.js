import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Facade from "../../../facades/Facade";
import { alpha } from "@mui/material/styles";
import {
	Button,
	Box,
	Divider,
	MenuItem,
	Typography,
	Avatar,
	IconButton,
} from "@mui/material";

import MenuPopover from "./MenuPopover";
import loginFacade from "../../../facades/Facade";
import { MENU_OPTIONS } from "../MenuItems";

export default function Popover(props) {
	const anchorRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState();

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		setUser(loginFacade.getUser());
	}, [open]);

	const handleLogout = () => {
		Facade.logout();
		props.changeLoginStatus("/");
	};

	return (
		<>
			<IconButton
				ref={anchorRef}
				onClick={handleOpen}
				sx={{
					padding: 0,
					width: 44,
					height: 44,
					...(open && {
						"&:before": {
							zIndex: 1,
							content: "''",
							width: "100%",
							height: "100%",
							borderRadius: "50%",
							position: "absolute",
							bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
						},
					}),
				}}
			>
				<Avatar
					src={"static/mock-images/avatars/avatar_default.jpg"}
					alt="photoURL"
				/>
			</IconButton>

			<MenuPopover
				open={open}
				onClose={handleClose}
				anchorEl={anchorRef.current}
				sx={{ width: 220 }}
			>
				<Box sx={{ my: 1.5, px: 2.5 }}>
					<Typography
						variant="subtitle1"
						sx={{ textTransform: "capitalize" }}
						noWrap
					>
						{user && user.username}
					</Typography>
					<Typography
						variant="body2"
						sx={{ color: "text.secondary", textTransform: "capitalize" }}
						noWrap
					>
						{user && user.roles.map((role) => role)}
					</Typography>
				</Box>

				<Divider
					sx={{
						my: 1,
					}}
				/>

				{MENU_OPTIONS.map((option) => (
					<MenuItem
						key={option.label}
						to={option.linkTo}
						component={RouterLink}
						onClick={handleClose}
						sx={{
							typography: "body2",
							py: 1,
							mx: 0.5,
							"&:hover": {
								color: "black",
								backgroundColor: "#eeeeee",
								borderRadius: 3,
								mx: 0.5,
							},
						}}
					>
						<Box
							component={Icon}
							icon={option.icon}
							sx={{
								mr: 2,
								width: 22,
								height: 22,
							}}
						/>

						{option.label}
					</MenuItem>
				))}

				<Box sx={{ p: 2, pt: 1.5 }}>
					<Button
						fullWidth
						color="inherit"
						variant="outlined"
						onClick={handleLogout}
					>
						Logout
					</Button>
				</Box>
			</MenuPopover>
		</>
	);
}
