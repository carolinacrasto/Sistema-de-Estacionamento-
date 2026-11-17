import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import axios from 'axios';

function CadastroTickets() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [placa, setPlaca] = useState('');
  const [categoriaId, setCategoriaId] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [horaEntrada, setHoraEntrada] = useState('');
  const [status, setStatus] = useState('ABERTO');
  const [operadorEntradaId, setOperadorEntradaId] = useState(0);

  const [dadosCategorias, setDadosCategorias] = useState([]);

  useEffect(() => {
    // Busca as categorias para preencher o select
    axios.get('/db.json')
      .then(response => {
        setDadosCategorias(response.data.categorias || []);
        
        // Se for edição, busca o ticket correspondente
        if (idParam) {
          const ticketEncontrado = (response.data.tickets || []).find(t => t.id === Number(idParam));
          if (ticketEncontrado) {
            setId(ticketEncontrado.id);
            setPlaca(ticketEncontrado.placa);
            setCategoriaId(ticketEncontrado.categoriaId);
            setCategoria(ticketEncontrado.categoria);
            setDataEntrada(ticketEncontrado.dataEntrada);
            setHoraEntrada(ticketEncontrado.horaEntrada);
            setStatus(ticketEncontrado.status);
            setOperadorEntradaId(ticketEncontrado.operadorEntradaId);
          }
        }
      })
      .catch(error => console.error("Erro ao carregar dados:", error));
  }, [idParam]);

  const inicializar = () => {
    navigate('/listagem-tickets');
  };

  const salvar = () => {
    const ticketData = {
      id: id ? Number(id) : Date.now(),
      placa,
      categoriaId: Number(categoriaId),
      categoria,
      dataEntrada,
      horaEntrada,
      dataSaida: null,
      horaSaida: null,
      valorTotal: null,
      status,
      operadorEntradaId: Number(operadorEntradaId)
    };
    
    console.log("Salvando ticket:", ticketData);
    alert("Ticket salvo com sucesso! (Simulação com JSON local)");
    navigate('/listagem-tickets');
  };

  return (
    <div className='container'>
      <Card title={idParam ? 'Editar Ticket' : 'Cadastro de Novo Ticket'}>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Placa do Veículo: *' htmlFor='inputPlaca'>
                <input
                  type='text'
                  id='inputPlaca'
                  value={placa}
                  className='form-control'
                  onChange={(e) => setPlaca(e.target.value.toUpperCase())}
                  placeholder='Ex: ABC1D23'
                />
              </FormGroup>

              <FormGroup label='Categoria: *' htmlFor='selectCategoria'>
                <select
                  className='form-select'
                  id='selectCategoria'
                  value={categoriaId}
                  onChange={(e) => {
                    const catId = e.target.value;
                    setCategoriaId(catId);
                    const catSelecionada = dadosCategorias.find(c => c.id === Number(catId));
                    if (catSelecionada) setCategoria(catSelecionada.nome);
                  }}
                >
                  <option value='0'>Selecione uma categoria...</option>
                  {dadosCategorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome} (R$ {cat.valorHora}/h)
                    </option>
                  ))}
                </select>
              </FormGroup>

              <div className='row'>
                <div className='col-md-6'>
                  <FormGroup label='Data de Entrada: *' htmlFor='inputDataEntrada'>
                    <input
                      type='date'
                      id='inputDataEntrada'
                      value={dataEntrada}
                      className='form-control'
                      onChange={(e) => setDataEntrada(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className='col-md-6'>
                  <FormGroup label='Hora de Entrada: *' htmlFor='inputHoraEntrada'>
                    <input
                      type='time'
                      id='inputHoraEntrada'
                      value={horaEntrada}
                      className='form-control'
                      onChange={(e) => setHoraEntrada(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </div>

              <FormGroup label='ID do Operador de Entrada: *' htmlFor='inputOperador'>
                <input
                  type='number'
                  id='inputOperador'
                  value={operadorEntradaId}
                  className='form-control'
                  onChange={(e) => setOperadorEntradaId(e.target.value)}
                />
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

export default CadastroTickets;