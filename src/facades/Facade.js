import { URL } from "../constants.js";

const handleHttpErrors = async (res) => {
	if (!res.ok) {
		const response = await res.json();
		if (response.message === "Token not valid (timed out?)") {
			Facade.logout();
		}
		return Promise.reject(response);
	}
	return await res.json();
};

const Facade = () => {
	const login = (user, password) => {
		const options = makeOptions("POST", true, {
			username: user,
			password: password,
		});
		return fetch(URL + "/api/login", options)
			.then(handleHttpErrors)
			.then((res) => {
				console.log(JSON.stringify(res));
				setToken(res.token);
				//Sets user in localstorage for usage later
				setUser(res.username, res.roles);
			});
	};

	const setUser = (username, roles) => {
		const user = { username, roles };
		//makes the user object in json format, as you cant store objects in localStorage
		localStorage.setItem("user", JSON.stringify(user));
	};
	const getUser = () => {
		return JSON.parse(localStorage.getItem("user"));
	};

	const setToken = (token) => {
		localStorage.setItem("jwtToken", token);
	};
	const getToken = () => {
		return localStorage.getItem("jwtToken");
	};
	const loggedIn = () => {
		return getToken() != null;
	};
	const logout = () => {
		localStorage.removeItem("jwtToken");
		localStorage.removeItem("user");
	};

	const makeOptions = (method, addToken, body) => {
		var opts = {
			method: method,
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			},
		};
		if (addToken && loggedIn()) {
			opts.headers["x-access-token"] = getToken();
		}
		if (body) {
			opts.body = JSON.stringify(body);
		}
		return opts;
	};
	return {
		makeOptions,
		setUser,
		getUser,
		setToken,
		getToken,
		loggedIn,
		login,
		logout,
	};
};

export default Facade();
