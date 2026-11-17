import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import axios from 'axios';

function CadastroUsuarios() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [perfil, setPerfil] = useState('OPERADOR');
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    if (idParam) {
      axios.get('/db.json')
        .then(response => {
          const usuario = (response.data.usuarios || []).find(u => u.id === Number(idParam));
          if (usuario) {
            setId(usuario.id);
            setNome(usuario.nome);
            setEmail(usuario.email);
            setSenha(usuario.senha);
            setPerfil(usuario.perfil);
            setAtivo(usuario.ativo);
          }
        })
        .catch(error => console.error("Erro:", error));
    }
  }, [idParam]);

  const inicializar = () => {
    navigate('/listagem-usuarios');
  };

  const salvar = () => {
    alert("Usuário salvo com sucesso!");
    navigate('/listagem-usuarios');
  };

  return (
    <div className='container'>
      <Card title={idParam ? 'Editar Usuário' : 'Cadastro de Novo Usuário'}>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='E-mail: *' htmlFor='inputEmail'>
                <input
                  type='email'
                  id='inputEmail'
                  value={email}
                  className='form-control'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Senha: *' htmlFor='inputSenha'>
                <input
                  type='password'
                  id='inputSenha'
                  value={senha}
                  className='form-control'
                  onChange={(e) => setSenha(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Perfil: *' htmlFor='selectPerfil'>
                <select
                  className='form-select'
                  id='selectPerfil'
                  value={perfil}
                  onChange={(e) => setPerfil(e.target.value)}
                >
                  <option value='OPERADOR'>OPERADOR</option>
                  <option value='ADMIN'>ADMIN</option>
                </select>
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} type='button' className='btn btn-success'>
                  Salvar
                </button>
                <button onClick={inicializar} type='button' className='btn btn-danger'>
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroUsuarios;