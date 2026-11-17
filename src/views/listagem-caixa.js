import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/card';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ListagemCaixa() {
  const navigate = useNavigate();
  const [caixa, setCaixa] = useState([]);

  const cadastrar = () => {
    navigate('/cadastro-caixa');
  };

  const editar = (id) => {
    navigate(`/cadastro-caixa/${id}`);
  };

  const excluir = (id) => {
    setCaixa(caixa.filter((item) => item.id !== id));
  };

  useEffect(() => {
    axios.get('/db.json')
      .then(response => {
        console.log("Dados recebidos no componente:", response.data);
        // Extrai o array de caixa com segurança total
        const dadosCaixa = response.data?.caixa || [];
        setCaixa(dadosCaixa);
      })
      .catch(error => {
        console.error("ERRO AO CARREGAR:", error);
      });
  }, []);

  return (
    <div className='container'>
      <Card title='Listagem de Caixa'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='mb-3'>
 
</div>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning mb-3'
                onClick={() => cadastrar()}
              >
                Novo Lançamento
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>ID Caixa</th>
                    <th scope='col'>ID Usuário</th>
                    <th scope='col'>Abertura (Data/Hora)</th>
                    <th scope='col'>Valor Inicial</th>
                    <th scope='col'>Fechamento (Data/Hora)</th>
                    <th scope='col'>Valor Final</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Movimentações</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(caixa) && caixa.length > 0 ? (
                    caixa.map((dado) => (
                      <tr key={dado.id}>
                        <td>{dado.sangrias ? dado.sangrias.length : 0} sangria(s)</td>
                        <td>{dado.reforcos ? dado.reforcos.length : 0} reforço(s)</td>
                        <td>{dado.id}</td>
                        <td>{dado.usuarioId}</td>
                        <td>{dado.dataAbertura} às {dado.horaAbertura}</td>
                        <td>
                          R$ {dado.valorInicial !== undefined && dado.valorInicial !== null 
                            ? Number(dado.valorInicial).toFixed(2).replace('.', ',') 
                            : '0,00'}
                        </td>
                        <td>
                          {dado.dataFechamento && dado.horaFechamento 
                            ? `${dado.dataFechamento} às ${dado.horaFechamento}` 
                            : '—'}
                        </td>
                        <td>
                          {dado.valorFinal !== undefined && dado.valorFinal !== null 
                            ? `R$ ${Number(dado.valorFinal).toFixed(2).replace('.', ',')}` 
                            : '—'}
                        </td>
                        <td>
                          <span className={`badge ${dado.status === 'ABERTO' ? 'bg-success' : 'bg-danger'}`}>
                            {dado.status}
                          </span>
                        </td>
                        <td>{dado.movimentacoes ? dado.movimentacoes.length : 0} item(s)</td>
                        <td>
                          <Stack spacing={1} padding={0} direction='row'>
                            <IconButton aria-label='edit' onClick={() => editar(dado.id)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton aria-label='delete' onClick={() => excluir(dado.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center text-muted py-4">
                        A carregar dados do caixa ou nenhum registo encontrado...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemCaixa;