import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./screens/LoginScreen";
import { Switch, Route, useHistory } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./screens/DashboardScreen";
import ProtectedScreen from "./screens/ProtectedScreen";
import Facade from "./facades/loginFacade";
import AdminScreen from "./screens/AdminScreen";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

//import PrivateRoute from "./components/PrivateRoute";

function App() {
	const [loggedIn, setLoggedIn] = React.useState(Facade.loggedIn());
	const [user, setUser] = useState();
	const [open, setOpen] = useState(false);
	let history = useHistory();

	const changeLoginStatus = (pageToGo) => {
		setLoggedIn(!loggedIn);
		history.push(pageToGo);
	};

	useEffect(() => {
		setUser(Facade.getUser);
		console.log(user);
	}, [loggedIn, history]);

	return (
		<div
			className="App"
			style={{ display: "flex", minHeight: "100%", overflow: "hidden" }}
		>
			{loggedIn ? (
				<>
					<Sidebar
						isOpenSidebar={open}
						onCloseSidebar={() => setOpen(false)}
						loggedIn={loggedIn}
						user={user}
					/>
					<TopBar
						changeLoginStatus={changeLoginStatus}
						onOpenSidebar={() => setOpen(true)}
						user={user}
					/>
				</>
			) : null}

			<Switch>
				<Route exact path="/">
					{loggedIn ? (
						<Home user={user} />
					) : (
						<Login changeLoginStatus={changeLoginStatus} />
					)}
				</Route>

				<PrivateRoute
					path="/protected"
					loggedIn={loggedIn}
					component={ProtectedScreen}
				/>
				<PrivateRoute
					path="/admin"
					loggedIn={loggedIn}
					user={user}
					component={AdminScreen}
				/>

				<Route path="/login">
					<Login changeLoginStatus={changeLoginStatus} />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
