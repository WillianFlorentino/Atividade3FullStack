import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form, Container, Table, InputGroup } from 'react-bootstrap';
import { FaListAlt, FaSearch, FaTrashAlt, FaEdit, FaBackspace} from 'react-icons/fa';
import BtnCadastrar from '../../Componentes/BtnCadastrar.jsx';
import AtividadeService from '../../services/AtividadeService';
import { Link } from 'react-router-dom';

const atividadeService = new AtividadeService();

function CadAtivSust() {
    const [listaAtividades, setListaAtividades] = useState([]);

    const listarAtividades = async () => {
        const dados = await atividadeService.obterTodos();
        setListaAtividades(dados);
    }
    
    useEffect(() => {

            listarAtividades();

    },[])

    const handleExcluir = async (id)=>{
         
         if(window.confirm('Tem certeza que deseja excluir?')){
      
            await atividadeService.delete(id)
            await listarAtividades()
            }
         
       }
    

    return (
        <>
            <div className="bg-white p-0 rounded shadow w-100" style={{ minHeight: '90vh' }}>
                <h2 className="text-center mb-4"><FaListAlt /> CADASTRO DE ATIVIDADE SUSTENTÁVEL</h2>
                <Container className='mt-2'>
                    <Card>
                        <Card.Header as="h4">
                            <Row className="align-items-center">
                                <Col lg={2}>Atividades:</Col>
                                <Col lg={6}>
                                    <Form.Group className='mb-0'>
                                        <Form.Control
                                            className="border-secondary"
                                            type="text"
                                            placeholder="Pesquise o Nome da Atividade Sustentável"
                                          
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={2}>
                                    <Button variant="secondary" className="w-100" >
                                        <FaSearch /> Pesquisar
                                    </Button>
                                </Col>
                                <Col lg={2}>
                                    <Button variant="secondary" className="w-100" >
                                        <FaBackspace /> Limpar
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col lg={8}>
                                    <Form.Group className='mb-0'>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                placeholder="Digite uma nova atividade"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col lg={2}>
                                    <BtnCadastrar
                                    />
                                </Col>
                                <Col lg={2}>
                                </Col>
                            </Row>
                       
                        </Card.Body>
                    </Card>
                </Container>
                <Container className="mt-2">
                    <Card>
                    <Card.Header as="h5">Atividades Cadastradas</Card.Header>
                    <Card.Body>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Nome da Atividade</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                        listaAtividades.length<=0? "Nenhum item pra listar":
                        listaAtividades.map(atividade=>(

                            <tr>
                            <td>{atividade.id}</td>
                            <td>{atividade.nome}</td>
                            <td>
                            <Link to={`/atividade/${atividade.id}`}  className="btn btn-primary m-1" > <FaEdit></FaEdit>  Editar</Link>
                            <Button className="btn btn-danger" onClick={()=>handleExcluir(atividade.id)} > <FaTrashAlt></FaTrashAlt>  Excluir</Button>   
                            </td>
                        </tr>
                        ))

                        }
                
                    
                    </tbody>
                    </Table>
                    </Card.Body>
                    </Card>

                    </Container>
            </div>
        </>
    );
}

export default CadAtivSust;
