import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import './styles.css';
import api from "../../services/api";

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault(); // Evita que a página recarregue quando o form for submetido

    const data = { title, description, value };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push('/profile');
    } catch (err) {
      alert(`Erro ao cadastrar caso, tente novamente.`);
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={ logoImg } alt="Be the Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o cado detalhadamento para encontrar um herói para resolver isso.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041"/>
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input placeholder="Título do caso" value={title} onChange={ e => setTitle(e.target.value)}/>
          <textarea placeholder="Descrição" value={description} onChange={ e => setDescription(e.target.value)}/>
          <input placeholder="Valor em reais" value={value} onChange={ e => setValue(e.target.value)}/>

          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}