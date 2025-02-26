import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const opciones = ['USD', 'COP', 'EUR', 'MXN', 'ARS', 'CLP', 'PEN', 'BRL', 'VES', 'CAD', 'BOB', 'PYG', 'UYU', 'GBP', 'CHF'];

  const [valorInputAConvertir, setValorInputAConvertir] = useState(); //input de la moneda
  const [valorInputConvertida, setValorInputConvertida] = useState();// input de la moneda convertida

  const [datos, setDatos] = useState(); //Datos de la API

  //Para controlar el input de la moneda
  const manejarInput = (e) => {
    setValorInputAConvertir(e.target.value);
  }

  //Función para llamar la API
  const llamarApi = async () => {
    const respuesta = await fetch('https://v6.exchangerate-api.com/v6/8fa39d2317e2e8b92861d620/latest/USD');
    const datos = await respuesta.json();
    setDatos(datos.conversion_rates);
  }

  //Para llamar la API al cargar el componente
  useEffect(() => {
    llamarApi();
  }, [])

  //Para que cuando se "envie" el formulario se ejecute la conversion de la moneda
  const convertirMoneda = (e) => {
    e.preventDefault();
    const nombreMonedaAConvertir = e.target.children[1].value
    const nombreMonedaConvertida = e.target.children[3].value
    
    setValorInputConvertida((valorInputAConvertir * datos[nombreMonedaConvertida] / datos[nombreMonedaAConvertir]).toFixed(2));
  }
  
  return (
    <>
      <form onSubmit={convertirMoneda} action="">
        <input type="number" id='aConvertir' value={valorInputAConvertir} onChange={manejarInput} />
        <select name="" id="seleccionMonedaAConvertir">
          {opciones.map((opcion,index) => {
            return <option key={opcion} value={opcion}>{opcion}</option>
          })}
        </select>

        <input type="number" id='Convertida'  value={valorInputConvertida} disabled/>
        <select name="" id="seleccionMonedaConvertir">
          {opciones.map((opcion,index) => {
            return <option key={opcion} value={opcion}>{opcion}</option>
          })}
        </select>
        <button type="submit">Convertir</button>
      </form>
    </>
  )
}

export default App