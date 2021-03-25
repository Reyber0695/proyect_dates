import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {

    //crear state para la citas

    const [cita, actualizarCita ] = useState({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    });

    //state del error cuando hay campos vacios

    const [ error, actualizarError ] = useState(false);

    const actualizarState = e => {
        actualizarCita({
          ...cita, //para escribir el state primero se hace una copia de no hacerlo se pierden los datos
          [e.target.name]: e.target.value
        })
    }

    //Extraer los valores 

    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //cuando el usuario presiona agregar cita

    const submitCita = e => {
      e.preventDefault();
      
      //Validar

      if(mascota.trim() === '' || 
         propietario.trim() === '' ||
         fecha.trim() === '' ||
         hora.trim() === '' ||
         sintomas.trim() === ''
      ){
         actualizarError(true);
         return;
      }

      //eliminar el mensaje de error
      actualizarError(false);

      //Asignar un id
      cita.id = uuidv4();

      //Crear la cita
      crearCita(cita);
      
      //Reiniciar el form
      actualizarCita({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
      })
    }

    return (
        <Fragment>
            <h2>Crear una cita</h2>

            { error? 
              <div className="alert alert-danger" role="alert">
                Todos los campos son obligatorios
              </div>              
              :
              null
            }

            <form
              onSubmit = { submitCita }
            >
                <label>Nombre mascota</label>
                <input 
                  type="text"
                  name="mascota"
                  className="form-control mb-2"
                  placeholder="Nombre mascota"
                  onChange= { actualizarState }
                  value= { mascota }
                />
                <label>Nombre dueño</label>
                <input 
                  type="text"
                  name="propietario"
                  className="form-control mb-2"
                  placeholder="Nombre dueño"
                  onChange= { actualizarState }
                  value={ propietario }
                />
                <label>Fecha</label>
                <input 
                  type="date"
                  name="fecha"
                  className="form-control mb-2"
                  onChange= { actualizarState }
                  value= { fecha }
                />
                <label>Hora</label>
                <input 
                  type="time"
                  name="hora"
                  className="form-control mb-2"
                  onChange= { actualizarState }
                  value= { hora }
                />
                <label>Sintomas</label>
                <textarea
                  name="sintomas"
                  className="form-control mb-4"
                  onChange= { actualizarState }
                  value= { sintomas }
                ></textarea>
                <button
                  type="submit"
                  className="form-control mb-2 btn btn-primary"
                >Agregar cita</button>
            </form>
        </Fragment>
    );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}


 
export default Formulario;