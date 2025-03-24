import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useLocation, useNavigate } from "react-router-dom";

export const AddContact = () => {
	const { actions } = useContext(Context);
	const navigate = useNavigate();
	const location = useLocation();
	const editingContact = location.state || null;

	const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });    

	useEffect(() => {
		if (editingContact) {
			setForm({
				full_name: editingContact.full_name,
				email: editingContact.email,
				phone: editingContact.phone,
				address: editingContact.address
			});
		}
	}, [editingContact]);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (editingContact) {
			actions.updateContact(editingContact.id, form);
		} else {
			actions.addContact(form);
		}
		navigate("/");
	};

	return (
		<div className="container mt-4">
			<h2>{editingContact ? "✏️ Editar Contacto" : "➕ Nuevo Contacto"}</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label className="form-label">Nombre completo</label>
					<input
						type="text"
						className="form-control"
						name="name"
						value={form.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Email</label>
					<input
						type="email"
						className="form-control"
						name="email"
						value={form.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Teléfono</label>
					<input
						type="tel"
						className="form-control"
						name="phone"
						value={form.phone}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Dirección</label>
					<input
						type="text"
						className="form-control"
						name="address"
						value={form.address}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary me-2">
					{editingContact ? "Guardar Cambios" : "Agregar Contacto"}
				</button>
				<button className="btn btn-secondary" onClick={() => navigate("/")}>
					Cancelar
				</button>
			</form>
		</div>
	);
};
