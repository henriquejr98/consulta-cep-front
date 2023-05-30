import './App.css';
import { useState } from 'react';

function App() {
  const [cep, setCep] = useState(null)
  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const cep = formData.get("cep")
    const response = await fetch(`http://localhost:8000/consulta/${cep}/`)
    if (response.status === 200) {
      const data = await response.json()
      setCep(data)
    }
  }
  return (
    <div className='container'>
      <h1>Consulta CEP</h1>
      <form onSubmit={handleSubmit} className='form-container'>
        <input type="text" name="cep"/>
        <button type="submit">Pesquisar</button>
      </form>
      {cep ? (<div className='data-container'>
        <p>Cep {cep.cep}</p>
        <p>Estado {cep.state}</p>
        <p>Cidade {cep.city}</p>
        <p>Bairro {cep.neighborhood}</p>
        <p>Rua {cep.street}</p>
      </div>) : null}
    </div>
  );
}

export default App;
