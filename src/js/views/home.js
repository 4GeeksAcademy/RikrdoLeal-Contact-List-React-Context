import React, { useState, useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import imgContact from "../../img/darthvader.webp";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedContact, setEditedContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  useEffect(() => {
    actions.getUser("rikrdoLeal");
    actions.getContacts("rikrdoLeal");
  }, []);

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setEditedContact({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      address: contact.address
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
    setEditedContact({
      name: "",
      phone: "",
      email: "",
      address: ""
    });
  };

  const handleSaveChanges = () => {
    const userId = store.user; // Obtener el userId del store
    const { id: contactId } = selectedContact; // Obtener el contactId del contacto seleccionado
    actions.editContact(userId, contactId, editedContact)
      .then(() => {
        handleCloseModal();
        actions.getContacts("rikrdoLeal"); // Actualizar los contactos después de editar
      })
      .catch(error => {
        console.error("Error al editar el contacto:", error);
        // Manejar errores si es necesario
      });
  };

  const handleDeleteContact = (contactId) => {
    actions.deleteContact(contactId);
  };

  if (!(store.contacts && store.contacts.contacts)) return null;

  return (
    <div className="mt-5">
      <div>
        <h1 className="text-center m-4">Contact List</h1>

        {store.contacts.contacts.map((item) => (
          <div className="card mb-0" key={item.id} style={{ width: "auto", margin: "auto", maxWidth: "70%" }}>
            <div className="row align-items-center">
              <div className="col-md-4">
                <img src={imgContact} className="img img-thumbnail" alt="" style={{ maxHeight: "200px" }} />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-text">{item.address}</p>
                  <p className="card-text">{item.phone}</p>
                  <p className="card-text">
                    <small className="text-body-secondary">
                      {item.email}
                    </small>
                  </p>
                </div>
              </div>
              <div className="col-md-2">
                <button type="button" className="btn btn-secondary me-3" onClick={() => handleEditContact(item)}>✏️</button>
                <button type="button" className="btn btn-danger" onClick={() => handleDeleteContact(item.id)}>✖️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* este es el modal para editar el contacto */}
      {selectedContact && (
        <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Contact</h5>
                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" className="form-control" id="name" value={editedContact.name} onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input type="text" className="form-control" id="phone" value={editedContact.phone} onChange={(e) => setEditedContact({ ...editedContact, phone: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">email:</label>
                  <input type="email" className="form-control" id="email" value={editedContact.email} onChange={(e) => setEditedContact({ ...editedContact, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input type="text" className="form-control" id="address" value={editedContact.address} onChange={(e) => setEditedContact({ ...editedContact, address: e.target.value })} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;