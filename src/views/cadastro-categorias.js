import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import axios from 'axios';

function CadastroCategorias() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [valorHora, setValorHora] = useState('');
  const [valorDiaria, setValorDiaria] = useState('');
  const [valorPernoite, setValorPernoite] = useState('');
  const [vagasTotais, setVagasTotais] = useState('');
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    if (idParam) {
      axios.get('/db.json')
        .then(response => {
          const cat = (response.data.categorias || []).find(c => c.id === Number(idParam));
          if (cat) {
            setId(cat.id);
            setNome(cat.nome);
            setValorHora(cat.valorHora);
            setValorDiaria(cat.valorDiaria);
            setValorPernoite(cat.valorPernoite);
            setVagasTotais(cat.vagasTotais);
            setAtivo(cat.ativo);
          }
        })
        .catch(error => console.error("Erro:", error));
    }
  }, [idParam]);

  const inicializar = () => {
    navigate('/listagem-categorias');
  };

  const salvar = () => {
    alert("Categoria salva com sucesso!");
    navigate('/listagem-categorias');
  };

  return (
    <div className='container'>
      <Card title={idParam ? 'Editar Categoria' : 'Cadastro de Nova Categoria'}>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome da Categoria: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>

              <div className='row'>
                <div className='col-md-4'>
                  <FormGroup label='Valor Hora (R$): *' htmlFor='inputValorHora'>
                    <input
                      type='number'
                      id='inputValorHora'
                      value={valorHora}
                      className='form-control'
                      onChange={(e) => setValorHora(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className='col-md-4'>
                  <FormGroup label='Valor Diária (R$): *' htmlFor='inputValorDiaria'>
                    <input
                      type='number'
                      id='inputValorDiaria'
                      value={valorDiaria}
                      className='form-control'
                      onChange={(e) => setValorDiaria(e.target.value)}
                    />
                  </FormGroup>
                </div>
                <div className='col-md-4'>
                  <FormGroup label='Valor Pernoite (R$): *' htmlFor='inputValorPernoite'>
                    <input
                      type='number'
                      id='inputValorPernoite'
                      value={valorPernoite}
                      className='form-control'
                      onChange={(e) => setValorPernoite(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </div>

              <FormGroup label='Vagas Totais: *' htmlFor='inputVagas'>
                <input
                  type='number'
                  id='inputVagas'
                  value={vagasTotais}
                  className='form-control'
                  onChange={(e) => setVagasTotais(e.target.value)}
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

export default CadastroCategorias;