import React, { useState } from 'react';
import './NavBar.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaClipboard, FaBars, FaHome } from 'react-icons/fa';
import { Container } from 'react-bootstrap';
import Footer from '../Componentes/Footer.jsx';

function NavBar() {
    const [show, setShow] = useState(true);
    const [isHome, setIsHome] = useState(false);

    const location = useLocation();

    const handleShow = () => {
        setShow(!show);
    };

    // Verifica se a página atual é a Home
    React.useEffect(() => {
        setIsHome(location.pathname === '/Componentes');
    }, [location.pathname]);

    return (
        <>
            <div className={`side-navbar ${show ? 'active-nav' : ''}`} id="sidebar">
                <ul className="nav flex-column text-white w-100 p-8">
                    <span className="nav-link h3 text-black mt-4 mb-0 fw-bold fs-2 pb-0 text-center italic-text">ECOGEST</span>
                    <span className="nav-link h1 text-black my-0 pt-0 text-center">Inovando o Presente, Preservando o Futuro</span>
                    <li className="nav-link px-2 py-3">
                        <Link to="/Componentes">
                            <FaHome />
                            <span className="mx-2">Home</span>
                        </Link>
                    </li>
                    <li className='nav-link px-2 py-3'>
                        <Link to="/AgendarServicos">
                        <FaClipboard />
                        <span className="mx-2">Agendar Serviços</span></Link>
                    </li>
                    <li className='nav-link px-2 py-3'>
                        <Link to="/PersonalizarAgendamentos">
                        <FaClipboard />
                        <span className="mx-2">Visualizar Agendamentos</span></Link>
                    </li>
                    <li className='nav-link px-2 py-3'>
                        <Link to="/VisualizarAgendamentos">
                        <FaClipboard />
                        <span className="mx-2">Personalizar Agendamento</span></Link>
                    </li>
                    <li className="nav-link px-2 py-3">
                        <Link to="/AtivSustentaveis">
                            <FaClipboard />
                            <span className="mx-2">Cadastrar Ativ. Sustentável</span>
                        </Link>
                    </li>
                    <li className="nav-link px-2 py-3">
                        <Link to="/Beneficiarios">
                            <FaClipboard />
                            <span className="mx-2">Cadastro de Beneficiarios</span>
                        </Link>
                    </li>
                    <li className="nav-link px-2 py-3">
                        <Link to="/Colaboradores">
                            <FaClipboard />
                            <span className="mx-2">Cadastro de Colaboradores</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className={`p-1 my-container ${show ? 'active-cont' : ''}`}>
                <nav onClick={handleShow} className="navbar top-navbar navbar-light bg-#025c14; px-1">
                    <FaBars className="fs-2 text-white" />
                    <p className="text-white">Olá Colaborador</p>
                </nav>
                <Container className={`main-container ${isHome ? '' : 'bg-white'} p-2 rounded-5 mb-5`}>
                    <Outlet />
                    <Footer className="main-footer p-2"></Footer>
                </Container>
            </div>
        </>
    );
}

export default NavBar;
