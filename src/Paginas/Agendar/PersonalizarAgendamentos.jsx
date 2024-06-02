import { Container, Card, Button, Table, Form} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import './AgendarCss/PersonalizarAgendamentos.css';

function PersonalizarAgendamentos() {
    
    const [listaAgendamentos, setListaAgendamentos] = useState([]);

    useEffect(() => {
        const listaSalva = localStorage.getItem('agendamentos');
        if (listaSalva!== null) {
            setListaAgendamentos(JSON.parse(listaSalva));
        }}, []);

    const handleExcluir = (id) => {
        const novaLista = listaAgendamentos.filter((agendamento) => agendamento.id !== id);
        setListaAgendamentos(novaLista);
        localStorage.setItem('agendamentos', JSON.stringify(novaLista));
    }

    return (
        
        <Container className="container">
            <Card className="mt-4"> 
                <h1 id="titulo">Visualizar Agendamento</h1>

                <Card.Body>
                    <div className="pesquisa">
                        <Form.Control type="text" placeholder="Pesquisar Agendamento" id='input'/>
                        <Button>PESQUISAR</Button>
                    </div>
                        
                                
                            
                        
                    
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>NOME</th>
                            <th>CPF</th>
                            <th>CONTATO</th>
                            <th>DATA</th>
                            <th>ACAO</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                            listaAgendamentos.length<= 0 ? (<tr><td>Não existem agendamentos</td></tr>):
                            listaAgendamentos.map((agendamento) => (
                                <tr>
                                    <td>{agendamento.id}</td>
                                    <td>{agendamento.nome}</td>
                                    <td>{agendamento.cpf}</td>
                                    <td>{agendamento.contato}</td>
                                    <td>{agendamento.data}</td>
                                    <td>
                                        <Link className='ml-2 btn btn-warning' onClick={() => './AgendarServicos.jsx'}> <FaEdit/> Editar</Link>
                                        <Link className= 'ml-2 btn btn-danger' onClick={() => handleExcluir(agendamento.id)} id="excluir"> <FaTrash/> Excluir</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className='barra'></div>


                </Card.Body>
            </Card>
        </Container> 
    );
}

export default PersonalizarAgendamentos;