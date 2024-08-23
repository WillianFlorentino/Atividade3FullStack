import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import CadAtivSust from './Paginas/AtivSustentaveis/CadAtivSust';
import Beneficiarios from './Paginas/Beneficiarios/Beneficiarios';
import FormColab from './Paginas/Colaboradores/FormColab';
import Maquinario from './Paginas/Maquinario/Maquinario';
import reportWebVitals from './reportWebVitals';
import NavBar from './Componentes/NavBar';
import Home from './Componentes/Home';
import CadTiposServ from './Paginas/TiposDeServico/CadTiposServ';
import CadTipoMaq from './Paginas/TipoMaquinario/CadTipoMaq';

const router = createBrowserRouter(
  [
    {
      //raiz
      element:<NavBar></NavBar>,
      children:[
        {
          path:'/',
          element:<Home />
        },

        {
          path:'/Componentes',
          element:<Home></Home>
        },

        {
          path:'/AtivSustentaveis',
          element:<CadAtivSust></CadAtivSust>
        },

        {
          path:'/AtivSustentaveis/:idAtividade',
          element:<CadAtivSust></CadAtivSust>
        },

        {
          path:'/Beneficiarios',
          element:<Beneficiarios></Beneficiarios>
        },

        {
          path:'/Colaborador',
          element:<FormColab></FormColab>
        },
        {         
          path:'/colaborador/:idColaborador',
          element:<FormColab></FormColab>       
        },
        {
          path: '/TiposDeMaquinario',
          element: <CadTipoMaq></CadTipoMaq>
        },
        {         
          path:'/TiposDeMaquinario/:idTiposDeMaquinario',
          element:<CadTipoMaq></CadTipoMaq>       
        },
        {
          path: '/Maquinario',
          element: <Maquinario></Maquinario>
        },
        {         
          path:'/maquinario/:idMaquinario',
          element:<Maquinario></Maquinario>       
        },
        {         
          path:'/TiposDeServico',
          element:<CadTiposServ></CadTiposServ>     
        },
        {         
          path:'/TiposDeServico/:idServico',
          element:<CadTiposServ></CadTiposServ>     
        }
      ]
    }
  ]
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
