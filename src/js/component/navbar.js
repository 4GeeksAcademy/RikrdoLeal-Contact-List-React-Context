import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar sticky-top d-flex">
			<div className="container-fluid justify-content-end">
				<Link to="/demo">
					<button className="btn btn-success">Create New Contact</button>
				</Link>
			</div>
		</nav>
	);
};
