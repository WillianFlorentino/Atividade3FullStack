import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form, Container, Table, Alert } from 'react-bootstrap';
import { FaListAlt, FaSearch, FaTrashAlt, FaEdit, FaBackspace, FaCheckCircle, FaTimes } from 'react-icons/fa';
import BtnCadastrar from '../../Componentes/BtnCadastrar.jsx';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AtividadeService from '../../services/AtividadeService';
const atividadeService = new AtividadeService();

function CadAtivSust() {
    const [listaAtividades, setListaAtividades] = useState([]);
    const [sucessoMensagem, setSucessoMensagem] = useState('');
    const [novaAtividade, setNovaAtividade] = useState('');
    const [editandoAtividade, setEditandoAtividade] = useState(null);
    const [erro, setErro] = useState('');
    const navigate = useNavigate();
    const [validated,setValidated] =useState(false);
    const [nome, setNome] = useState('');
    const [errors, setErrors] = useState({});
    const { idAtividade } = useParams();

    const listarAtividades = async () => {
        const dados = await atividadeService.obterTodos();
        setListaAtividades(dados);
    };

    useEffect(() => {
        listarAtividades();
    }, []);

    useEffect(() => {
        const obterAtividade = async () => {
            if (idAtividade) {
                const dados = await atividadeService.obterPorId(idAtividade);
                setNome(dados.nome);
            }
        };
        obterAtividade();
    }, [idAtividade]);

    const handleNomeChange = (e) => {
        const value = e.target.value;
        setNome(value);
        if (value && value.length <= 100) {
            setErrors((prev) => ({ ...prev, nome: null }));
        } else {
            if (value === '') {
                setErrors((prev) => ({ ...prev, nome: 'O Nome não pode ser vazio.' }));
            } else {
                setErrors((prev) => ({ ...prev, nome: 'O Nome não pode ter mais de 100 caracteres.' }));
            }
        }
    };

    async function handleSalvar(event) {
        event.preventDefault();
        const form = event.currentTarget;
        let newErrors = {};

        if (!nome) {
            newErrors.nome = 'O Nome não pode estar vazio.';
        } else if (nome.length > 100) {
            newErrors.nome = 'O Nome não pode ter mais de 100 caracteres.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const atividade = {
                id: idAtividade || 0, 
                nome: nome,
            };

            if (!idAtividade) {
                await atividadeService.adicionar(atividade);
                setSucessoMensagem('Atividade cadastrada com sucesso!');
            } else {
                await atividadeService.atualizar(idAtividade, atividade);
                setSucessoMensagem('Atividade atualizada com sucesso!');
            }

            setNome('');
            setErrors({});
            listarAtividades();
        }
    }

    const handleExcluir = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            await atividadeService.delete(id);
            await listarAtividades();
        }
    };
    const handleEditar = (atividade) => {
        setNovaAtividade(atividade.nomeAtivSust);
        setEditandoAtividade(atividade);
    };

    const handleCancelar = () => {
        setNome('');
        setEditandoAtividade(null);
        setErro('');
        navigate('/AtivSustentaveis'); 
    };

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
                                    <Button variant="secondary" className="w-100">
                                        <FaSearch /> Pesquisar
                                    </Button>
                                </Col>
                                <Col lg={2}>
                                    <Button variant="secondary" className="w-100">
                                        <FaBackspace /> Limpar
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSalvar}>
                                <Row className="align-items-center">
                                    <Col lg={8}>
                                        <Form.Group controlId="nome">
                                            <Form.Control
                                                type="text"
                                                className="border-secondary"
                                                placeholder="Digite uma nova atividade..."
                                                required
                                                value={nome}
                                                isInvalid={!!errors.nome}
                                                onChange={handleNomeChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.nome}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={2}>
                                        <BtnCadastrar
                                        editandoAtividade={editandoAtividade}
                                        handleEditar={handleEditar}
                                        handleCancelar={handleCancelar}/>
                                    </Col>
                                    <Col lg={2}>
                                        {editandoAtividade && (
                                            <Button className='btn w-100' variant='danger' onClick={handleCancelar}>
                                                <FaTimes /> Cancelar
                                            </Button>
                                        )}
                                    </Col>                                    
                                </Row>
                                <Col lg={10}>
                                <Alert className="mt-3 text-center" variant="success" show={sucessoMensagem!==""}  > <b> <FaCheckCircle></FaCheckCircle> </b> {sucessoMensagem}</Alert>
                                </Col>
                            </Form>
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
                                    {listaAtividades.length <= 0 ? (
                                        <tr>
                                            <td colSpan="3" className="text-center">Nenhum item para listar</td>
                                        </tr>
                                    ) : (
                                        listaAtividades.map((atividade) => (
                                            <tr key={atividade.id}>
                                                <td>{atividade.id}</td>
                                                <td>{atividade.nome}</td>
                                                <td>
                                                    <Link to={`${atividade.id}`} className="btn btn-primary m-1" onClick={() => handleEditar(atividade)}>
                                                        <FaEdit /> Editar
                                                    </Link>
                                                    <Button className="btn btn-danger" onClick={() => handleExcluir(atividade.id)}>
                                                        <FaTrashAlt /> Excluir
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
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
