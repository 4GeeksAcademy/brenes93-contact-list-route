import React from "react";

export const ContactCard = ({ contact, onDelete, onEdit }) => {
	return (
		<div className="card my-2 shadow-sm">
			<div className="card-body d-flex justify-content-between align-items-center">
				<div>
					<h5 className="card-title">{contact.name}</h5>
					<p className="card-text mb-1">
						📞 {contact.phone}
					</p>
					<p className="card-text mb-1">
						📧 {contact.email}
					</p>
					<p className="card-text">
						📍 {contact.address}
					</p>
				</div>
				<div>
					<button className="btn btn-outline-primary me-2" onClick={() => onEdit(contact)}>
						✏️
					</button>
					<button className="btn btn-outline-danger" onClick={() => onDelete(contact.id)}>
						🗑️
					</button>
				</div>
			</div>
		</div>
	);
};

