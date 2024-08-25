import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import CadAtivSust from './Paginas/AtivSustentaveis/CadAtivSust';
import Beneficiarios from './Paginas/Beneficiarios/Beneficiarios';
import FormColab from './Paginas/Colaboradores/FormColab';
import Maquinario from './Paginas/Maquinario/Maquinario';
import reportWebVitals from './reportWebVitals';
import NavBar from './Componentes/NavBar';
import Home from './Componentes/Home';
import CadTiposServ from './Paginas/TiposDeServico/CadTiposServ';
import CadTipoMaq from './Paginas/TipoMaquinario/CadTipoMaq';
import App from './App';

const router = createBrowserRouter(
  [
    {
      path: '/', 
      element: <App />
    },
    {
      element: <NavBar />, 
      children: [
        {
          path: '/Componentes',
          element: <Home />
        },
        {
          path: '/AtivSustentaveis',
          element: <CadAtivSust />
        },
        {
          path: '/AtivSustentaveis/:idAtividade',
          element: <CadAtivSust />
        },
        {
          path: '/Beneficiarios',
          element: <Beneficiarios />
        },
        {
          path: '/Colaborador',
          element: <FormColab />
        },
        {
          path: '/colaborador/:idColaborador',
          element: <FormColab />
        },
        {
          path: '/TiposDeMaquinario',
          element: <CadTipoMaq />
        },
        {
          path: '/TiposDeMaquinario/:idTiposDeMaquinario',
          element: <CadTipoMaq />
        },
        {
          path: '/Maquinario',
          element: <Maquinario />
        },
        {
          path: '/maquinario/:idMaquinario',
          element: <Maquinario />
        },
        {
          path: '/TiposDeServico',
          element: <CadTiposServ />
        },
        {
          path: '/TiposDeServico/:idServico',
          element: <CadTiposServ />
        }
      ]
    }
  ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
