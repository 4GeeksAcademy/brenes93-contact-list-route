import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/contactCard";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		actions.loadContacts();
	}, []);

	const handleDelete = (id) => {
		if (confirm("¿Estás seguro de que deseas eliminar este contacto?")) {
			actions.deleteContact(id);
		}
	};

	const handleEdit = (contact) => {
		navigate("/edit", { state: contact }); // puedes enviar el contacto a la vista de edición
	};

	return (
		<div className="container mt-4">
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h1>📇 Contactos</h1>
				<button className="btn btn-success" onClick={() => navigate("/add")}>
					➕ Agregar Contacto
				</button>
			</div>

			{store.contacts.length === 0 ? (
				<p>No hay contactos aún.</p>
			) : (
				store.contacts.map((contact) => (
					<ContactCard
						key={contact.id}
						contact={contact}
						onDelete={handleDelete}
						onEdit={handleEdit}
					/>
				))
			)}
		</div>
	);
};
