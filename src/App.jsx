import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListaContactos from './components/ListaContactos';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  // Estado para almacenar la lista de contactos
  const [contactos, setContactos] = useState([]);

  // Estado para almacenar el valor de búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Estado para almacenar el tema de la aplicación (claro u oscuro)
  const [tema, setTema] = useState('light');

  // Estado para almacenar el índice del contacto que se está editando
  const [contactoEditando, setContactoEditando] = useState(null);

  // Estado para almacenar el índice del contacto que se va a eliminar
  const [contactoAEliminar, setContactoAEliminar] = useState(null);

  // Estado para almacenar temporalmente el contacto que se va a agregar
  const [contactoAAgregar, setContactoAAgregar] = useState(null);

  // Efecto para cargar los contactos guardados en localStorage cuando se monta el componente
  useEffect(() => {
    const contactosGuardados = JSON.parse(localStorage.getItem('contactos'));
    if (contactosGuardados) {
      setContactos(contactosGuardados);
    }
  }, []);

  // Función para manejar la adición de un nuevo contacto
  const agregarContacto = (contacto) => {
    setContactoAAgregar(contacto);
  };

  // Función para confirmar la adición de un nuevo contacto
  const confirmarAgregarContacto = () => {
    let nuevosContactos;
    if (contactoEditando !== null) {
      nuevosContactos = contactos.map((c, index) =>
        index === contactoEditando ? contactoAAgregar : c
      );
      setContactoEditando(null);
    } else {
      nuevosContactos = [...contactos, contactoAAgregar];
    }
    setContactos(nuevosContactos);
    localStorage.setItem('contactos', JSON.stringify(nuevosContactos));
    setContactoAAgregar(null);
  };

  // Función para eliminar un contacto
  const eliminarContacto = () => {
    if (contactoAEliminar !== null) {
      const nuevosContactos = contactos.filter((_, i) => i !== contactoAEliminar);
      setContactos(nuevosContactos);
      localStorage.setItem('contactos', JSON.stringify(nuevosContactos));
      setContactoAEliminar(null);
    }
  };

  // Función para establecer el índice del contacto que se está editando
  const editarContacto = (index) => {
    setContactoEditando(index);
  };

  // Función para manejar la búsqueda de contactos
  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  // Función para cambiar el tema de la aplicación
  const cambiarTema = (nuevoTema) => {
    setTema(nuevoTema);
  };

  // Filtrar contactos según la búsqueda
  const contactosFiltrados = contactos.filter(
    (contacto) =>
      contacto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      contacto.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      contacto.telefono.includes(busqueda)
  );

  return (
    <div className={`container ${tema}`}>
      <h1 className="text-left my-4">📒Directorio de Contactos📒</h1>
      <div className="text-end mb-3">
        <button className="btn btn-light me-2" onClick={() => cambiarTema('light')}>
          Claro
        </button>
        <button className="btn btn-dark" onClick={() => cambiarTema('dark')}>
          Oscuro
        </button>
      </div>
      <div className="row mb-3">
        <div className={`col-md-8 offset-md-2 ${tema === 'dark' ? 'bg-dark text-white' : ''}`}>
          <Formulario agregarContacto={agregarContacto} contactoEditando={contactoEditando !== null ? contactos[contactoEditando] : null} />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            placeholder="Buscar contactos..."
            className="form-control"
            value={busqueda}
            onChange={manejarBusqueda}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2 className="mb-3">Contactos guardados:</h2>
          <ListaContactos 
            contactos={contactosFiltrados} 
            editarContacto={editarContacto} 
            setContactoAEliminar={setContactoAEliminar} 
          />
        </div>
      </div> 
      {contactoAEliminar !== null && (
        <div 
          className="modal fade show" 
          tabIndex="-1" 
          style={{ display: 'block', backgroundColor: tema === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)' }}
        >
          <div className="modal-dialog">
            <div className={`modal-content ${tema === 'dark' ? 'bg-dark text-white' : ''}`}>
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
                <button type="button" className="btn-close" onClick={() => setContactoAEliminar(null)}></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar este contacto?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setContactoAEliminar(null)}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={eliminarContacto}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {contactoAAgregar !== null && (
        <div 
          className="modal fade show" 
          tabIndex="-1" 
          style={{ display: 'block', backgroundColor: tema === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)' }}
        >
          <div className="modal-dialog">
            <div className={`modal-content ${tema === 'dark' ? 'bg-dark text-white' : ''}`}>
              <div className="modal-header">
                <h5 className="modal-title">Confirmar agregar contacto</h5>
                <button type="button" className="btn-close" onClick={() => setContactoAAgregar(null)}></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas agregar este contacto?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setContactoAAgregar(null)}>Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={confirmarAgregarContacto}>Agregar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;