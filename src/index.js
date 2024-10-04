import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import CadAtivSust from './Paginas/AtivSustentaveis/CadAtivSust';
import CriarAtivSust from './Paginas/CriarAtivSust/CriarAtivSust';
import Beneficiarios from './Paginas/Beneficiarios/Beneficiarios';
import FormColab from './Paginas/Colaboradores/FormColab';
import Maquinario from './Paginas/Maquinario/Maquinario';
import reportWebVitals from './reportWebVitals';
import NavBar from './Componentes/NavBar';
import Home from './Componentes/Home';
import CadTiposServ from './Paginas/TiposDeServico/CadTiposServ';
import CadTipoMaq from './Paginas/TipoMaquinario/CadTipoMaq';
import Login from './Componentes/Login';
import Register from './Componentes/Register';
import UpdateUserRole from './Componentes/atualizarrole';
import ProtectedRoute from './Componentes/ProtectedRoute';
import PrivateRoute from './Componentes/ProtectedRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />, // Página de login principal
  },
  {
    path: '/register',
    element: <Register />, // Rota para o registro
  },
  {
    path: '/update-role', // Rota para atualizar a role do usuário
    element: <PrivateRoute roles={['admin']}> <UpdateUserRole />, </PrivateRoute> // Componente para atualizar a role
  },
  {
    element: <NavBar />, 
    children: [
      {
        path: '/Componentes',
        element: <Home /> // Rota protegida
      },
      {
        path: '/AtivSustentaveis',
        element: <PrivateRoute roles={['admin', 'diretor']}> <CadAtivSust /> </PrivateRoute>, // Rota protegida
      },
      {
        path: '/CriarAtivSust',
        element: <PrivateRoute roles={['admin', 'diretor', 'colaborador']}> <CriarAtivSust /> </PrivateRoute  >, // Rota protegida
      },
      {
        path: '/AtivSustentaveis/:idAtividade',
        element: <PrivateRoute roles={['admin', 'diretor']}> <CadAtivSust /> </PrivateRoute>, // Rota protegida
      },
      {
        path: '/Beneficiarios',
        element: <PrivateRoute roles={['admin', 'diretor']}> <Beneficiarios/> </PrivateRoute>, // Rota protegida
      },
      {
        path: '/Colaborador',
        element: <PrivateRoute roles={['admin']}> <FormColab/> </PrivateRoute>, // Rota protegida
      },
      {
        path: '/colaborador/:idColaborador',
        element: <PrivateRoute roles={['admin']}> <FormColab/> </PrivateRoute>, // Rota protegida
      },
      {
        path: '/TiposDeMaquinario',
        element: <PrivateRoute roles={['admin']}> <CadTipoMaq /> </PrivateRoute>, // Rota protegida
      },
      {
        path: '/TiposDeMaquinario/:idTiposDeMaquinario',
        element: <PrivateRoute roles={['admin']}> <CadTipoMaq /> </PrivateRoute>, // Rota protegida
      },
      {
        path: '/Maquinario',
        element: <PrivateRoute roles={['admin', 'diretor']}> <Maquinario /> </PrivateRoute>, // Rota protegida
      },
      {
        path: '/maquinario/:idMaquinario',
        element: <PrivateRoute roles={['admin', 'diretor']}> <Maquinario /> </PrivateRoute>, // Rota protegida
      },
      {
        path: '/TiposDeServico',
        element:  <PrivateRoute roles={['admin', 'diretor', 'colaborador']}> <CadTiposServ /> </PrivateRoute>, // Rota protegida
      },
      {
        path: '/TiposDeServico/:idServico',
        element: <PrivateRoute roles={['admin', 'diretor', 'colaborador']}> <CadTiposServ /> </PrivateRoute>, // Rota protegida
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
