import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const ListaContactos = ({ contactos, editarContacto, setContactoAEliminar }) => {
  // Estado para manejar la página actual de la paginación
  const [paginaActual, setPaginaActual] = useState(1);

  // Número de contactos que se muestran por página
  const [contactosPorPagina] = useState(5); 

  // Calcular los índices de los contactos que se muestran en la página actual
  const indiceUltimoContacto = paginaActual * contactosPorPagina;
  const indicePrimerContacto = indiceUltimoContacto - contactosPorPagina;
  const contactosActuales = contactos.slice(indicePrimerContacto, indiceUltimoContacto);

  // Función para cambiar de página en la paginación
  const paginar = (numeroPagina) => setPaginaActual(numeroPagina);

  return (
    <div className="mt-3">
      <h2>Lista de Contactos</h2>
      {contactosActuales.length === 0 ? (
        <p>No hay contactos guardados.</p>
      ) : (
        contactosActuales.map((contacto, index) => (
          <div key={index} className="card mb-2">
            <div className="card-body">
              <h5 className="card-title">{contacto.nombre}</h5>
              <p className="card-text">{contacto.email}</p>
              <p className="card-text">{contacto.telefono}</p>
              <button className="btn btn-danger me-2" onClick={() => setContactoAEliminar(indicePrimerContacto + index)}>
                <FaTrashAlt /> Eliminar
              </button>
              <button className="btn btn-primary" onClick={() => editarContacto(indicePrimerContacto + index)}>
                <FaEdit /> Editar
              </button>
            </div>
          </div>
        ))
      )}
      {/* Paginación */}
      {contactos.length > contactosPorPagina && (
        <nav className="mt-3">
          <ul className="pagination">
            {Array.from({ length: Math.ceil(contactos.length / contactosPorPagina) }, (_, i) => (
              <li key={i} className={`page-item ${paginaActual === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginar(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ListaContactos;