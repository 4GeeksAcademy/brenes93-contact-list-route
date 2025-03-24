const API_URL = "https://playground.4geeks.com/contact/agendas";
const AGENDA_SLUG = "my_agenda";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			createAgenda: async () => {
				try {
					const res = await fetch(`${API_URL}/${AGENDA_SLUG}`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({}) // obligatorio enviar body
					});
					if (res.ok) {
						console.log(`Agenda "${AGENDA_SLUG}" creada exitosamente.`);
					} else {
						const errorData = await res.json();
						if (
							errorData?.detail &&
							errorData.detail.includes("already exists")
						) {
							console.log(`La agenda "${AGENDA_SLUG}" ya existe.`);
						} else {
							console.warn("No se pudo crear la agenda:", errorData);
						}
					}
				} catch (error) {
					console.error("Error al crear la agenda:", error);
				}
			},
			

			loadContacts: async () => {
				try {
					const res = await fetch(`${API_URL}/${AGENDA_SLUG}/contacts`);
					if (!res.ok) throw new Error("Failed to fetch contacts");
					const data = await res.json();
					setStore({ contacts: data.contacts || [] });
				} catch (error) {
					console.error("Error loading contacts:", error);
				}
			},

			addContact: async (contact) => {
				try {
					const { name, email, phone, address } = contact;
			
					const cleanedContact = {
						name: name.trim(),
						email: email.trim(),
						phone: phone.trim(),
						address: address.trim()
					};
			
					const res = await fetch(`${API_URL}/${AGENDA_SLUG}/contacts`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(cleanedContact)
					});
			
					if (!res.ok) {
						const error = await res.json();
						console.error("Error al crear contacto:", error);
						alert("❌ No se pudo crear el contacto. Verifica los campos.");
						return;
					}
			
					getActions().loadContacts();
				} catch (error) {
					console.error("Error adding contact:", error);
				}
			},
			

			updateContact: async (id, updatedContact) => {
				try {
					await fetch(`${API_URL}/${AGENDA_SLUG}/contacts/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(updatedContact)
					});
					getActions().loadContacts();
				} catch (error) {
					console.error("Error updating contact:", error);
				}
			},

			deleteContact: async (id) => {
				try {
					await fetch(`${API_URL}/${AGENDA_SLUG}/contacts/${id}`, {
						method: "DELETE"
					});
					getActions().loadContacts();
				} catch (error) {
					console.error("Error deleting contact:", error);
				}
			}
		}
	};
};

export default getState;
