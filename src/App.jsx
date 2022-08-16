import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [dato, setDato] = useState([]);
  const [buscar, setBuscar] = useState('');
  let message = '';

  try {
    let ruta = "https://api.themoviedb.org/3/discover/movie?api_key=a8bf047869d000586a3eb83df8fa3819";
    const API = async () => {
      const response = await fetch(ruta);
      const datos = await response.json();
      setDato(datos.results);
    };
    useEffect(() => {
      API();
    }, []);
  } catch (error) {
    console.log(error);
  }

  // const resultado = [];

  const resultado = !buscar ? dato : dato.filter((elemento) => elemento.title.toLowerCase().includes(buscar.toLocaleLowerCase()));

  if(resultado === ''){
    message = 'No hay datos correspondientes a su busqueda';
  }

  return (
    <div className="App container pt-3">

      <div className="card mb-3 shadow-lg">
        <div className="card-header text-center">
          <h4 className="card-title">Buscador de Peliculas Populares TheMovie DB</h4>
        </div>
        <div className="card-body">
          <div className="p-5">
            <input value={buscar} onChange={(e)=> setBuscar(e.target.value)} type="text" placeholder="Search.." className="form-control" />
          </div>
          <ul className="text-center">
            {resultado.map((dat) => (
              <li className="p-2" key={dat.id}>{dat.title}</li>
            ))}
            <p className="card-text">{message}</p>
          </ul>
      </div>
      </div>

    </div>
  );
}

export default App;
