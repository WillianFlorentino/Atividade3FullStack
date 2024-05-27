import './AgendarCss/VisualizarAgendamentos.css';
import { Card, Container, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function VisualizarAgendamentos() {

    const [listaAgendamentos, setListaAgendamentos] = useState([]);

    useEffect(() => {
        const listaSalva = localStorage.getItem('agendamentos');
        if (listaSalva !== null) {
            setListaAgendamentos(JSON.parse(listaSalva));
        }
    }, []);

    return (
        <Container className="container">
            <Card className="mt-4">
                <h1 id="titulo">Personalizar Agendamento</h1>

                <Card.Body>
                    <h1>Dados Pessoais</h1>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOME</th>
                                <th>CPF</th>
                                <th>CONTATO</th>
                                <th>ENDEREÇO</th>
                                <th>NUMERO</th>
                                <th>BAIRRO</th>
                                <th>CIDADE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaAgendamentos.map((agendamento) => (
                                <tr key={agendamento.id}>
                                    <td>{agendamento.id}</td>
                                    <td>{agendamento.nome}</td>
                                    <td>{agendamento.cpf}</td>
                                    <td>{agendamento.contato}</td>
                                    <td>{agendamento.endereco}</td>
                                    <td>{agendamento.numero}</td>
                                    <td>{agendamento.bairro}</td>
                                    <td>{agendamento.cidade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className='barra'></div>
                    <h1>Detalhes do Serviço</h1>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>TIPO DE SERVIÇO</th>
                                <th>DATA</th>
                                <th>HORARIO</th>
                                <th>REFERENCIA ESPECIAIS</th>
                                <th>DESCRIÇÃO DO SERVIÇO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaAgendamentos.map((agendamento) => (
                                <tr key={agendamento.id}>
                                    <td>{agendamento.tipo}</td> {/* Aqui é 'tipo', não 'tiposervico' */}
                                    <td>{agendamento.data}</td>
                                    <td>{agendamento.horario}</td> {/* Aqui é 'horario', não 'horarioServico' */}
                                    <td>{agendamento.referenciaespecial}</td>
                                    <td>{agendamento.descricaoservico}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default VisualizarAgendamentos;
