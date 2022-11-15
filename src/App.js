import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import api from './services/app'
import './styles.css'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if (input === '') {
      alert('Preencha com algum CEP!')
    }
    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    }
    catch {
      alert('Verifique se digitou o CEP corretamente e tente novamente!')
      setInput("")
    }
    return;
  }

  return (
    <>
      <div className="container">
        <h1 className='title'>Busca CEP v1.0</h1>
        <h2 className='subtitle'>Para consultar um CEP use o campo abaixo!</h2>
        <div className="container-input">
          <input type="text" placeholder="Digite o CEP..." value={input} onChange={(e) => setInput(e.target.value)} />
          <button className="buttonSearch" onClick={handleSearch}>
            <BsSearch size={25} color="#fff" />
          </button>
        </div>
        {Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2>CEP: {cep.cep}</h2>
            <span>Rua: {cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>Localidade: {cep.localidade} - {cep.uf}</span>
          </main>
        )}
      </div>
    </>
  );
}

export default App;
