import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import axios from 'axios';

function CadastroCaixa() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [dataAbertura, setDataAbertura] = useState('');
  const [horaAbertura, setHoraAbertura] = useState('');
  const [valorInicial, setValorInicial] = useState('');
  const [status, setStatus] = useState('ABERTO');

  useEffect(() => {
    if (idParam) {
      axios.get('/db.json')
        .then(response => {
          const caixaEncontrado = (response.data.caixa || []).find(c => c.id === Number(idParam));
          if (caixaEncontrado) {
            setId(caixaEncontrado.id);
            setUsuarioId(caixaEncontrado.usuarioId);
            setDataAbertura(caixaEncontrado.dataAbertura);
            setHoraAbertura(caixaEncontrado.horaAbertura);
            setValorInicial(caixaEncontrado.valorInicial);
            setStatus(caixaEncontrado.status);
          }
        })
        .catch(error => console.error("Erro ao buscar caixa:", error));
    }
  }, [idParam]);

  const inicializar = () => {
    navigate('/listagem-caixa');
  };

  const salvar = () => {
    alert("Lançamento de caixa salvo com sucesso!");
    navigate('/listagem-caixa');
  };

  return (
    <div className='container'>
      <Card title={idParam ? 'Editar Lançamento de Caixa' : 'Abertura / Novo Caixa'}>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='ID do Usuário / Operador: *' htmlFor='inputUsuarioId'>
                <input
                  type='number'
                  id='inputUsuarioId'
                  value={usuarioId}
                  className='form-control'
                  onChange={(e) => setUsuarioId(e.target.value)}
                />
              </FormGroup>

              <div className='row'>
                <div className='col-md-6'>
                  <FormGroup label='Data de Abertura: *' htmlFor='inputDataAbertura'>
                    <input
                      type='date'
                      id='inputDataAbertura'
                      value={dataAbertura}
                      className='form-control'
                      onChange={(e) => setDataAbertura(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className='col-md-6'>
                  <FormGroup label='Hora de Abertura: *' htmlFor='inputHoraAbertura'>
                    <input
                      type='time'
                      id='inputHoraAbertura'
                      value={horaAbertura}
                      className='form-control'
                      onChange={(e) => setHoraAbertura(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </div>

              <FormGroup label='Valor Inicial (R$): *' htmlFor='inputValorInicial'>
                <input
                  type='number'
                  id='inputValorInicial'
                  value={valorInicial}
                  className='form-control'
                  onChange={(e) => setValorInicial(e.target.value)}
                  placeholder='0.00'
                />
              </FormGroup>

              <FormGroup label='Status do Caixa: *' htmlFor='selectStatus'>
                <select
                  className='form-select'
                  id='selectStatus'
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value='ABERTO'>ABERTO</option>
                  <option value='FECHADO'>FECHADO</option>
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

export default CadastroCaixa;