import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const opciones = [
    { codigo: 'USD', nombre: 'Dólar estadounidense' },
    { codigo: 'COP', nombre: 'Peso colombiano' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'MXN', nombre: 'Peso mexicano' },
    { codigo: 'ARS', nombre: 'Peso argentino' },
    { codigo: 'CLP', nombre: 'Peso chileno' },
    { codigo: 'PEN', nombre: 'Sol peruano' },
    { codigo: 'BRL', nombre: 'Real brasileño' },
    { codigo: 'VES', nombre: 'Bolívar venezolano' },
    { codigo: 'CAD', nombre: 'Dólar canadiense' },
    { codigo: 'BOB', nombre: 'Boliviano' },
    { codigo: 'PYG', nombre: 'Guaraní paraguayo' },
    { codigo: 'UYU', nombre: 'Peso uruguayo' },
    { codigo: 'GBP', nombre: 'Libra esterlina' },
    { codigo: 'CHF', nombre: 'Franco suizo' }
  ];

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
    
    let nombreMonedaAConvertir = e.target.children[0].children[1].value;
    let nombreMonedaConvertida = e.target.children[2].children[1].value;
    
    setValorInputConvertida((valorInputAConvertir * datos[nombreMonedaConvertida] / datos[nombreMonedaAConvertir]).toFixed(2));

    opciones.forEach((opcion) => {
      if (nombreMonedaAConvertir == opcion.codigo) {
        nombreMonedaAConvertir = opcion.nombre;
      }
    })

    opciones.forEach((opcion) => {
      if (nombreMonedaConvertida == opcion.codigo) {
        nombreMonedaConvertida = opcion.nombre;
      }
    })

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
              return <option key={index} value={opcion.codigo}>{opcion.codigo}</option>
            })}
          </select>
        </div>

        <i className="fa-solid fa-right-long"></i>

        <div className="contenedorInput">
          <input type="number" id='Convertida'  value={valorInputConvertida} disabled/>
          <select name="" id="seleccionMonedaConvertir">
            {opciones.map((opcion,index) => {
              return <option key={index} value={opcion.codigo}>{opcion.codigo}</option>
            })}
          </select>
        </div>
        <button type="submit">CONVERTIR</button>
      </form>
    </div>
  )
}

export default App