import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import StockFacade from "../facades/StockFacade";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const MainStyle = styled("div")(({ theme }) => ({
	flexGrow: 1,
	display: "flex",
	overflow: "auto",
	minHeight: "100%",
	justifyContent: "center",
	paddingTop: APP_BAR_MOBILE + 24,
	paddingBottom: theme.spacing(10),
	[theme.breakpoints.up("lg")]: {
		paddingTop: APP_BAR_DESKTOP + 24,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
}));

const UserScreen = ({ user }) => {
	const [updateUserObject, setUpdateUserObject] = useState({
		username: "",
		defaultCurrency: "",
		password: "",
	});

	const handleChange = (event) => {
		const target = event.target;
		const id = target.id;
		const value = target.value;
		setUpdateUserObject({ ...updateUserObject, [id]: value });
	};

	useEffect(() => {
		StockFacade.getUserData((user) => {
			setUpdateUserObject({
				...updateUserObject,
				username: user.username,
				defaultCurrency: user.defaultCurrency,
			});
		});
	});

	return (
		<MainStyle>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					flex: 1,
					margin: 3,
					maxWidth: 600,
				}}
			>
				<TextField
					id="username"
					label="Username"
					value={updateUserObject.username}
					onChange={handleChange}
					sx={{ marginBottom: 3 }}
					required
				/>
				<TextField
					id="defaultCurrency"
					label="Default Currency"
					value={updateUserObject.defaultCurrency}
					onChange={handleChange}
					sx={{ marginBottom: 3 }}
					required
				/>
				<TextField
					id="password"
					label="Password"
					value={updateUserObject.password}
					onChange={handleChange}
					sx={{ marginBottom: 3 }}
					type="password"
					helperText="Leave blank to not change password."
					inputProps={{
						autoComplete: "new-password",
					}}
				/>

				<Button
					variant="contained"
					disabled={true}
					sx={{ width: 150, height: 50, alignSelf: "flex-end" }}
				>
					Save
				</Button>
			</Box>
		</MainStyle>
	);
};

export default UserScreen;
