import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/card';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ListagemUsuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]); 

  const cadastrar = () => {
    navigate('/cadastro-usuarios');
  };

  const editar = (id) => {
    navigate(`/cadastro-usuarios/${id}`);
  };

  const excluir = (id) => {
   
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  useEffect(() => {
    axios.get('/db.json')
      .then(response => {
        const lista = response.data.usuarios || response.data;
        setUsuarios(lista);
      })
      .catch(error => {
        console.error("Erro ao buscar usuários:", error);
      });
  }, []);

  return (
    <div className='container'>
      <Card title='Listagem de Usuários'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning mb-3'
                onClick={() => cadastrar()}
              >
                Novo Usuário
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Nome</th>
                    <th scope='col'>E-mail</th>
                    <th scope='col'>Senha</th>
                    <th scope='col'>Perfil</th>
                    <th scope='col'>Ativo</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((dado) => ( 
                    <tr key={dado.id}>
                      <td>{dado.id}</td>
                      <td>{dado.nome}</td>
                      <td>{dado.email}</td>
                      <td>{dado.senha}</td>
                      <td>
                        <span className='badge bg-secondary'>{dado.perfil}</span>
                      </td>
                      <td>{dado.ativo ? 'Sim' : 'Não'}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemUsuarios;