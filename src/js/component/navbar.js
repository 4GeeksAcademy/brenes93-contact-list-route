import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
	const location = useLocation();

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 mb-3">
			<Link to="/" className="navbar-brand">
				📒 ContactList
			</Link>
		</nav>
	);
};
