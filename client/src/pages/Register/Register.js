import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../../utils/APIRoutes";

import "./Register.css";

const Register = () => {
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
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
			console.log("valid", registerRoute);
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
    const { password, confirmPassword, username, email } = values;
    if (username.length < 3) {
			toast.error(
				"Username should be greater than 3 characters.",
				// toastOptions
			);
      return false;
    } else if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        // toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        // toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", 
			// toastOptions
			);
      return false;
    }

		return true;
	}

	return (
		<>
	<div className="form-container">
			<form action="" onSubmit={(event) => handleSubmit(event)}>
				<div className="brand">
					{/* <img src={Logo} alt="logo" /> */}
					<h1>Cat chat</h1>
				</div>
				<input
					type="text"
					placeholder="Username"
					name="username"
					onChange={(e) => handleChange(e)}
				/>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={(e) => handleChange(e)}
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
					onChange={(e) => handleChange(e)}
				/>
				<input
					type="password"
					placeholder="Confirm Password"
					name="confirmPassword"
					onChange={(e) => handleChange(e)}
				/>
				<button type="submit">Create User</button>
				<span>
					Already have an account ? <Link to="/login">Login.</Link>
				</span>
			</form>
	</div>
	<ToastContainer/>
	</>
	);
}

export default Register;