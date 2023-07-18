import {FiSearch} from 'react-icons/fi';
import './app.css';
import { useState } from 'react';
import api from './services/api';


function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});
  
 async function handleSearch(){
    if(input === ''){
      alert("Preencha o CEP")
      return;
    }
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");
    }catch{
      alert("Houve um erro, verifique se digitou certo!");
      setInput("");
    }
  }
  return (
    <div className="container">
    <h1 className="title">Buscador de CEP
    </h1>
      <div className="containerInput">
        <input type="text"
      placeholder="Digite seu CEP..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#fff'></FiSearch>
        </button>
      </div>
  <div>

      {Object.keys(cep).length > 0 && (
       <main className='main'>
        <h2>CEP: {cep.cep} </h2>
        <span>{cep.logradouro} </span>
        <span>Bairro: {cep.bairro} </span>
        <span>Cidade: {cep.localidade} - {cep.uf} </span>
        <span>{cep.complemento} </span>
      
       </main>
      
      )}    

    </div>
  </div>

  );
}

export default App;
