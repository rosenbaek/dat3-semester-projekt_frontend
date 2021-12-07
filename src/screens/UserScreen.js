import { Autocomplete, Button, TextField } from "@mui/material";
import { Switch, Route, useHistory } from "react-router-dom";
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

const UserScreen = ({ user, reload }) => {
	const history = useHistory();
	const [updateUserObject, setUpdateUserObject] = useState({
		username: "",
		defaultCurrency: "",
	});
	const [currencies, setCurrencies] = useState([]);
	const [currencies1, setCurrencies1] = useState([]);

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
		StockFacade.getAllCurrencies((res) => {
			res.map((c) => {
				setCurrencies(res);
			});
		});
	}, []);

	const handleUpdate = () => {
		StockFacade.updateUserData(updateUserObject, (res) => {
			console.log(res);
			reload();
		});
	};

	const saveNeeded = () => {
		if (user) {
			if (
				updateUserObject.defaultCurrency === user.defaultCurrency &&
				!updateUserObject.password
			) {
				return true;
			} else {
				return false;
			}
		}
	};
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
					disabled
				/>

				<Autocomplete
					options={currencies.map((c) => c.code)}
					disablePortal
					value={updateUserObject.defaultCurrency}
					onChange={(event, newVal) => {
						if (newVal !== null) {
							setUpdateUserObject({
								...updateUserObject,
								defaultCurrency: newVal,
							});
						}
					}}
					sx={{ marginBottom: 3 }}
					renderInput={(params) => (
						<TextField
							{...params}
							id="defaultCurrency"
							label="Default Currency"
							InputProps={{
								...params.InputProps,
							}}
						/>
					)}
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
					disabled={saveNeeded()}
					sx={{ width: 150, height: 50, alignSelf: "flex-end" }}
					onClick={handleUpdate}
				>
					Save
				</Button>
			</Box>
		</MainStyle>
	);
};

export default UserScreen;
