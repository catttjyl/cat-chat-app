import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../../utils/APIRoutes";

import "./Login.css";

const Login = () => {
	const [values, setValues] = useState({
		username: "",
		password: "",
	});
	
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
		navigate("/");
		}
	}, []);

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	}
	// console.log(values);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (handleValidation()) {
			console.log("valid", loginRoute);
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
	}

	const handleValidation = () => {
    const { password, username } = values;
    if (username === ""|| password === "") {
      toast.error("Email and Password is required.");
      return false;
    }

		return true;
	}

	return (
		<>
	<div className="FormContainer">
		<form action="" onSubmit={(event) => handleSubmit(event)}>
			<div className="brand">
				<h1>Cat Chat</h1>
			</div>
			<input
				type="text"
				placeholder="Username"
				name="username"
				onChange={(e) => handleChange(e)}
				min="3"
			/>
			<input
				type="password"
				placeholder="Password"
				name="password"
				onChange={(e) => handleChange(e)}
			/>
			<button type="submit">Log In</button>
			<span>
				Don't have an account ? <Link to="/register">Create One.</Link>
			</span>
		</form>
	</div>
	<ToastContainer/>
	</>
	);
}

export default Login;