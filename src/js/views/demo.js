import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const [contactData, setContactData] = useState({
		name: "",
		phone: "",
		email: "",
		address: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setContactData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSave = () => {
		actions.saveContact(contactData);
		alert("Contact successfully created.");
        navigate("/");
	};

	return (
		<div className="container d-grid gap-2 col-8 mx-auto mt-4">
			<form>
				<h1 className="d-flex justify-content-center">Add a new contact</h1>
				<div className="form-row">
					<div className="form-group">
						<label form="inputName4">Full Name</label>
						<input type="text" name="name" className="form-control" id="inputName4" placeholder="Full Name" value={contactData.name} onChange={handleChange} />
					</div>
					<div className="form-group">
						<label form="inputEmail4">Email</label>
						<input type="text" name="email" className="form-control" id="inputEmail4" placeholder=" Enter Email" value={contactData.email} onChange={handleChange} />
					</div>
				</div>
				<div className="form-group">
					<label form="inputPhone">Phone</label>
					<input type="numeric" name="phone" className="form-control" id="inputPhone" placeholder="Enter Phone" value={contactData.phone} onChange={handleChange} />
				</div>
				<div className="form-group">
					<label form="inputAddress">Address</label>
					<input type="text" name="address" className="form-control" id="inputAddress" placeholder="Enter Address" value={contactData.address} onChange={handleChange}/>
				</div>
				<div className="d-grid gap-2 col-6 mx-auto">
					<button type="submit" className="btn btn-primary mt-3" onClick={handleSave}>Save</button>
				</div>
			</form>
			<Link to="/">
				<button className="btn btn-primary mt-3">Back home</button>
			</Link>
		</div>
	);
};
