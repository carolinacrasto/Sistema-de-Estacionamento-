import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/card';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ListagemPagamentos() {
  const navigate = useNavigate();
  const [pagamentos, setPagamentos] = useState([]);

  const cadastrar = () => {
    navigate('/cadastro-pagamentos');
  };

  const editar = (id) => {
    navigate(`/cadastro-pagamentos/${id}`);
  };

  const excluir = (id) => {
    setPagamentos(pagamentos.filter((item) => item.id !== id));
  };

  useEffect(() => {
    axios.get('/db.json')
      .then(response => {
        const lista = response.data.pagamentos || [];
        setPagamentos(lista);
      })
      .catch(error => {
        console.error("Erro ao buscar pagamentos:", error);
      });
  }, []);

  return (
    <div className='container'>
      <Card title='Listagem de Pagamentos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning mb-3'
                onClick={() => cadastrar()}
              >
                Novo Pagamento
              </button>
              <table className='table table-hover'>
                 <thead>
                  <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Ticket</th>
                    <th scope='col'>Forma de Pagamento</th>
                    <th scope='col'>Valor </th>
                    <th scope='col'>Valor Recebido</th>
                    <th scope='col'>Troco</th>
                    <th scope='col'>Data</th>
                    <th scope='col'>Hora</th>
                    <th scope='col'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pagamentos.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.id}</td>
                      <td>{dado.ticketId}</td>
                      <td>R$ {dado.formaPagamento}</td>
                      <td>R$ {dado.valor},00</td>
                      <td>{dado.valorRecebido},00</td>
                      <td>{dado.troco},00</td>
                      <td>{dado.data}</td>
                      <td>{dado.hora}</td>
                      <td>{dado.status}</td>                      
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

export default ListagemPagamentos;