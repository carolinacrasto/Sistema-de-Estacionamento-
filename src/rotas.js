import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import ListagemTickets from './views/listagem-tickets';
import CadastroTickets from './views/cadastro-tickets';

import ListagemCaixa from './views/listagem-caixa';
import CadastroCaixa from './views/cadastro-caixa';

import ListagemCategorias from './views/listagem-categorias';
import CadastroCategorias from './views/cadastro-categorias';

import ListagemPagamentos from './views/listagem-pagamentos';
import CadastroPagamentos from './views/cadastro-pagamentos';

import ListagemUsuarios from './views/listagem-usuarios';
import CadastroUsuarios from './views/cadastro-usuarios';

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListagemTickets />} />
        
        {/* Tickets */}
        <Route path='/listagem-tickets' element={<ListagemTickets />} />
        <Route path='/cadastro-tickets' element={<CadastroTickets />} />
        <Route path='/cadastro-tickets/:idParam' element={<CadastroTickets />} />

        {/* Caixa */}
        <Route path='/listagem-caixa' element={<ListagemCaixa />} />
        <Route path='/cadastro-caixa' element={<CadastroCaixa />} />
        <Route path='/cadastro-caixa/:idParam' element={<CadastroCaixa />} />

        {/* Categorias */}
        <Route path='/listagem-categorias' element={<ListagemCategorias />} />
        <Route path='/cadastro-categorias' element={<CadastroCategorias />} />
        <Route path='/cadastro-categorias/:idParam' element={<CadastroCategorias />} />

        {/* Pagamentos */}
        <Route path='/listagem-pagamentos' element={<ListagemPagamentos />} />
        <Route path='/cadastro-pagamentos' element={<CadastroPagamentos />} />
        <Route path='/cadastro-pagamentos/:idParam' element={<CadastroPagamentos />} />

        {/* Usuários */}
        <Route path='/listagem-usuarios' element={<ListagemUsuarios />} />
        <Route path='/cadastro-usuarios' element={<CadastroUsuarios />} />
        <Route path='/cadastro-usuarios/:idParam' element={<CadastroUsuarios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;