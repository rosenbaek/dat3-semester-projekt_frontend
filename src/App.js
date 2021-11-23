import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./screens/LoginScreen";
import { Switch, Route, useHistory } from "react-router-dom";
import PrivateRoute from "./components/utility/PrivateRoute";
import Home from "./screens/DashboardScreen";
import ProtectedScreen from "./screens/ProtectedScreen";
import Facade from "./facades/Facade";
import AdminScreen from "./screens/AdminScreen";
import Sidebar from "./components/navigation/Sidebar";
import TopBar from "./components/navigation/TopBar";

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
	}, [loggedIn, history]);

	return (
		<div
			className="App"
			style={{
				display: "flex",
				minHeight: "100%",
				flex: 1,
			}}
		>
			{loggedIn ? (
				<>
					<Sidebar
						isOpenSidebar={open}
						onCloseSidebar={() => setOpen(!open)}
						loggedIn={loggedIn}
						user={user}
					/>
					<TopBar
						isOpenSidebar={open}
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
