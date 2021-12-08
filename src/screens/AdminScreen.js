import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import StockFacade from "../facades/StockFacade";
import { useHistory } from "react-router-dom";
import Facade from "../facades/Facade";

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

const AdminScreen = (props) => {
	const history = useHistory();
	const [newUserObject, setNewUserObject] = useState({
		username: "",
		defaultCurrency: "",
		password: "",
		roles: [],
	});
	const [currencies, setCurrencies] = useState([]);

	useEffect(() => {
		StockFacade.getAllCurrencies((res) => {
			res.map((c) => {
				setCurrencies(res);
			});
		});
	}, []);

	const handleChange = (event) => {
		const target = event.target;
		const id = target.id;
		const value = target.value;
		setNewUserObject({ ...newUserObject, [id]: value });
	};

	const saveNeeded = () => {
		if (
			newUserObject.username === "" ||
			newUserObject.defaultCurrency === "" ||
			newUserObject.pasword === "" ||
			newUserObject.roles === []
		) {
			return true;
		} else {
			return false;
		}
	};

	const handleUpdate = () => {
		Facade.createUser(newUserObject, (res) => {
			console.log(res);
		});
	};

	return (
		<MainStyle>
			{props.user && Facade.getUser().roles.includes("admin") ? (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						flex: 1,
						margin: 3,
						maxWidth: 600,
					}}
				>
					<Typography variant="h4" sx={{ marginBottom: 2 }}>
						Create User
					</Typography>
					<TextField
						id="username"
						label="Username"
						value={newUserObject.username}
						onChange={handleChange}
						sx={{ marginBottom: 3 }}
						required
					/>

					<Autocomplete
						options={currencies.map((c) => c.code)}
						disablePortal
						value={newUserObject.defaultCurrency}
						onChange={(event, newVal) => {
							if (newVal !== null) {
								setNewUserObject({
									...newUserObject,
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
						required
					/>

					<Autocomplete
						multiple
						id="tags-standard"
						options={[{ roleName: "user" }, { roleName: "admin" }]}
						getOptionLabel={(option) => option.roleName}
						renderInput={(params) => (
							<TextField {...params} label="Roles" placeholder="Roles" />
						)}
						sx={{ marginBottom: 3 }}
						required
					/>

					<TextField
						id="password"
						label="Password"
						value={newUserObject.password}
						onChange={handleChange}
						sx={{ marginBottom: 3 }}
						type="password"
						inputProps={{
							autoComplete: "new-password",
						}}
						required
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
			) : (
				<h2 className="header">You are not allowed here!</h2>
			)}
		</MainStyle>
	);
};

export default AdminScreen;
