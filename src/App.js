import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';



function App() {

  //citas enel storafe

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

  if(!citasIniciales){
    citasIniciales = []; 
  }


  //Arreglo de citas 
  const [ citas, guardarCitas ] = useState(citasIniciales);

  //useeffect realiza ciertas tareas cuando cambia el state

  useEffect(() => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [ citas, citasIniciales]);

  //funcion que tome las citas actuales y agrega nuevas
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  //funcion que elimina la cita por su id

  const eliminarCita = id => {
    const nuevasCitas = citas.filter( cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //mensaje condicional

  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";


  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-5">
            <Formulario 
              crearCita = { crearCita }
            />
          </div>
          <div className="col-5">
            <h2 className="h2"> { titulo } </h2>
            { citas.map(cita => (
              <Cita
                key = { cita.id }
                cita = { cita }
                eliminarCita = { eliminarCita }
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
