import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';

function CadastroPagamentos() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [ticketId, setTicketId] = useState('');
  const [caixaId, setCaixaId] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('PIX');
  const [valor, setValor] = useState('');
  const [valorRecebido, setValorRecebido] = useState('');
  const [troco, setTroco] = useState(0);

  const inicializar = () => {
    navigate('/listagem-pagamentos');
  };

  const salvar = () => {
    alert("Pagamento registado com sucesso!");
    navigate('/listagem-pagamentos');
  };

  return (
    <div className='container'>
      <Card title={idParam ? 'Editar Pagamento' : 'Novo Pagamento / Baixa de Ticket'}>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <div className='row'>
                <div className='col-md-6'>
                  <FormGroup label='ID do Ticket: *' htmlFor='inputTicketId'>
                    <input
                      type='number'
                      id='inputTicketId'
                      value={ticketId}
                      className='form-control'
                      onChange={(e) => setTicketId(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className='col-md-6'>
                  <FormGroup label='ID do Caixa: *' htmlFor='inputCaixaId'>
                    <input
                      type='number'
                      id='inputCaixaId'
                      value={caixaId}
                      className='form-control'
                      onChange={(e) => setCaixaId(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </div>

              <FormGroup label='Forma de Pagamento: *' htmlFor='selectForma'>
                <select
                  className='form-select'
                  id='selectForma'
                  value={formaPagamento}
                  onChange={(e) => setFormaPagamento(e.target.value)}
                >
                  <option value='PIX'>PIX</option>
                  <option value='DINHEIRO'>DINHEIRO</option>
                  <option value='CARTAO'>CARTÃO</option>
                </select>
              </FormGroup>

              <div className='row'>
                <div className='col-md-4'>
                  <FormGroup label='Valor (R$): *' htmlFor='inputValor'>
                    <input
                      type='number'
                      id='inputValor'
                      value={valor}
                      className='form-control'
                      onChange={(e) => {
                        const v = e.target.value;
                        setValor(v);
                        if (valorRecebido) setTroco(Math.max(0, valorRecebido - v));
                      }}
                    />
                  </FormGroup>
                </div>
                <div className='col-md-4'>
                  <FormGroup label='Valor Recebido (R$):' htmlFor='inputRecebido'>
                    <input
                      type='number'
                      id='inputRecebido'
                      value={valorRecebido}
                      className='form-control'
                      onChange={(e) => {
                        const rec = e.target.value;
                        setValorRecebido(rec);
                        if (valor) setTroco(Math.max(0, rec - valor));
                      }}
                    />
                  </FormGroup>
                </div>
                <div className='col-md-4'>
                  <FormGroup label='Troco (R$):' htmlFor='inputTroco'>
                    <input
                      type='number'
                      id='inputTroco'
                      value={troco}
                      className='form-control'
                      disabled
                    />
                  </FormGroup>
                </div>
              </div>

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

export default CadastroPagamentos;