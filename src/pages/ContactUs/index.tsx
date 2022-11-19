import React from "react";
import "../../App.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function ContactUs() {
	let navigate = useNavigate();

	const onClick = () => {
		navigate("/");
	};
	return (
		<div className="App">
			<header className="App-header"></header>
		</div>
	);
}

export default ContactUs;
