import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const opciones = ['USD', 'COP', 'EUR', 'MXN', 'ARS', 'CLP', 'PEN', 'BRL', 'VES', 'CAD', 'BOB', 'PYG', 'UYU', 'GBP', 'CHF'];

  const [valorInputAConvertir, setValorInputAConvertir] = useState(); //input de la moneda
  const [valorInputConvertida, setValorInputConvertida] = useState();// input de la moneda convertida

  const [datos, setDatos] = useState(); //Datos de la API

  const [tituloConversion,setTituloConversion] = useState('CONVERSOR DE DIVISAS');

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
    
    const nombreMonedaAConvertir = e.target.children[0].children[1].value
    const nombreMonedaConvertida = e.target.children[2].children[1].value
    
    setValorInputConvertida((valorInputAConvertir * datos[nombreMonedaConvertida] / datos[nombreMonedaAConvertir]).toFixed(2));
    setTituloConversion(`Convertir de ${nombreMonedaAConvertir} a ${nombreMonedaConvertida}`);
  }
  
  return (
    <div id='contenedor'>
      <h1>{tituloConversion}</h1>
      <form onSubmit={convertirMoneda} action="">
        <div className="contenedorInput">
          <input type="number" id='aConvertir' value={valorInputAConvertir} onChange={manejarInput} placeholder='Digite el valor'/>
          <select name="" id="seleccionMonedaAConvertir">
            {opciones.map((opcion,index) => {
              return <option key={index} value={opcion}>{opcion}</option>
            })}
          </select>
        </div>

        <i class="fa-solid fa-right-long"></i>

        <div className="contenedorInput">
          <input type="number" id='Convertida'  value={valorInputConvertida} disabled/>
          <select name="" id="seleccionMonedaConvertir">
            {opciones.map((opcion,index) => {
              return <option key={index} value={opcion}>{opcion}</option>
            })}
          </select>
        </div>
        <button type="submit">CONVERTIR</button>
      </form>
    </div>
  )
}

export default App