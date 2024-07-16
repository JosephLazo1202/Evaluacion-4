import React, { useState, useEffect } from 'react';

const Formulario = ({ agregarContacto, contactoEditando }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [errorNombre, setErrorNombre] = useState('');
  const [errorCorreo, setErrorCorreo] = useState('');
  const [errorTelefono, setErrorTelefono] = useState('');

  // Efecto que actualiza los campos del formulario cuando se está editando un contacto
  useEffect(() => {
    if (contactoEditando) {
      setNombre(contactoEditando.nombre);
      setCorreo(contactoEditando.email);
      setTelefono(contactoEditando.telefono);
    } else {
      setNombre('');
      setCorreo('');
      setTelefono('');
    }
  }, [contactoEditando]);

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (!nombre) {
      setErrorNombre('El nombre es obligatorio.');
      return;
    }
    if (!correo) {
      setErrorCorreo('El correo electrónico es obligatorio.');
      return;
    }
    if (!telefono) {
      setErrorTelefono('El número de teléfono es obligatorio.');
      return;
    }

    // Validación de formato de correo electrónico
    if (!/\S+@\S+\.\S+/.test(correo)) {
      setErrorCorreo('La dirección de correo electrónico no es válida.');
      return;
    }

    // Validación de formato de número de teléfono
    if (!/^\d{9}$/.test(telefono)) {
      setErrorTelefono('El número de teléfono debe tener 9 dígitos.');
      return;
    }

    // Llamar a la función para agregar o actualizar el contacto
    agregarContacto({ nombre, correo, telefono });

    // Reiniciar los campos del formulario
    setNombre('');
    setCorreo('');
    setTelefono('');

    // Reiniciar los mensajes de error
    setErrorNombre('');
    setErrorCorreo('');
    setErrorTelefono('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        {errorNombre && <div className="alert alert-danger mt-2">{errorNombre}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Correo Electrónico</label>
        <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        {errorCorreo && <div className="alert alert-danger mt-2">{errorCorreo}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Número de Teléfono</label>
        <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        {errorTelefono && <div className="alert alert-danger mt-2">{errorTelefono}</div>}
      </div>
      <button type="submit" className="btn btn-primary">
        {contactoEditando ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
};

export default Formulario;
