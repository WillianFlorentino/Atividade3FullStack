import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form, Container, Alert, Table } from 'react-bootstrap';
import { FaListAlt, FaSave, FaTimes, FaSearch } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import AtivSustService from '../../services/AtivSustService.js'; // Certifique-se de que o caminho está correto

const ativSustService = new AtivSustService(); // Instância do serviço

function CriarAtivSust() {
    const [atividade, setAtividade] = useState({
        id: '',
        nome: '',
        cpf: '',
        contato: '',
        endereco: '',
        bairro: '',
        numero: '',
        tipoAtividade: {
            id: 0,
            nome: ''
        },
        data: '',
        horaInicial: '',
        horaFinal: '',
        descricao: ''
    });
    const [listaAtividades, setListaAtividades] = useState(null);
    const [tiposAtividades, setTiposAtividades] = useState([]); // Estado para armazenar os tipos de atividades
    const [sucessoMensagem, setSucessoMensagem] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();
    const { idAtivSust } = useParams();
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);
    const [termoBusca, setTermoBusca] = useState('');

    const handleFiltrar = async () => {
        await listarAtividades(termoBusca);
    };

    const listarAtividades = async (termoBusca) => {
        let dados = [];
        if (termoBusca) {
            dados = await ativSustService.filtrar(termoBusca);
            setListaAtividades(dados);
        } else {
            dados = await ativSustService.obterTodos();
            setListaAtividades(dados);
        }
    };

    useEffect(() => {
        // Carrega os tipos de atividades ao montar o componente
        const carregarTiposAtividades = async () => {
            try {
                const tipos = await ativSustService.obterTodos(); // Busca tipos do backend
                setTiposAtividades(tipos); // Atualiza o estado
            } catch (error) {
                console.error('Erro ao carregar tipos de atividades:', error);
                setErro('Erro ao carregar tipos de atividades.');
            }
        };

        carregarTiposAtividades();

        // Carrega os dados da atividade se um ID for fornecido
        if (idAtivSust) {
            const obterAtivSust = async () => {
                try {
                    const dados = await ativSustService.obterPorId(idAtivSust);
                    setAtividade(dados);
                } catch (error) {
                    console.error('Erro ao obter atividade por ID:', error);
                    setErro('Erro ao obter atividade.');
                }
            };
            obterAtivSust();
        }
    }, [idAtivSust]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAtividade({ ...atividade, [name]: value });
    };

    const validateFields = () => {
        const newErrors = {};

        if (!atividade.nome) newErrors.nome = 'O Nome não pode estar vazio.';
        if (!atividade.cpf) newErrors.cpf = 'O CPF não pode estar vazio.';
        if (!atividade.contato) newErrors.contato = 'O Contato não pode estar vazio.';
        if (!atividade.endereco) newErrors.endereco = 'O Endereço não pode estar vazio.';
        if (!atividade.tipoAtividade) newErrors.tipoAtividade = 'Selecione um tipo de atividade.';
        if (!atividade.data) newErrors.data = 'A Data é obrigatória.';
        if (!atividade.horaInicial) newErrors.horaInicial = 'A Hora Inicial é obrigatória.';
        if (!atividade.horaFinal) newErrors.horaFinal = 'A Hora Final é obrigatória.';
        if (!atividade.descricao) newErrors.descricao = 'A Descrição é obrigatória.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSalvar = async (event) => {
        event.preventDefault();
        if (!validateFields()) return; // Valida os campos antes de salvar

        try {
            if (!idAtivSust) {
                await ativSustService.adicionar(atividade); // Chama o método de adicionar
                setSucessoMensagem('Atividade cadastrada com sucesso!');
            } else {
                await ativSustService.atualizar(idAtivSust, atividade); // Chama o método de atualizar
                setSucessoMensagem('Atividade atualizada com sucesso!');
            }
        } catch (error) {
            setErro('Erro ao salvar a atividade.');
        }

        setTimeout(() => {
            setSucessoMensagem('');
            navigate('/criarativsust'); // Redireciona após o sucesso
        }, 3000);
    };

    const handleCancelar = () => {
        navigate('/criarativsust'); // Redireciona para a lista de atividades
    };

    return (
        <div className="bg-white p-0 rounded shadow w-100" style={{ minHeight: '90vh' }}>
            <h2 className="text-center mb-4"><FaListAlt /> CRIAR ATIVIDADE SUSTENTÁVEL</h2>
            
            {/* Container para Informações do Solicitante */}
            <Container className='mt-2'>
                <Card>
                    <Card.Header as="h4">Informações do Solicitante</Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={handleSalvar}>
                            <Row className="align-items-center mb-3">                                
                                <Col lg={6}>
                                    <Form.Group>
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            className="border-secondary"
                                            type="text"
                                            name="nome"
                                            value={atividade.nome}
                                            onChange={handleChange}
                                            placeholder="Digite seu nome completo"
                                            isInvalid={!!errors.nome}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.nome}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg={3}>
                                    <Form.Group>
                                        <Form.Label>CPF</Form.Label>
                                        <Form.Control
                                            className="border-secondary"
                                            type="text"
                                            name="cpf"
                                            value={atividade.cpf}
                                            onChange={handleChange}
                                            placeholder="Digite o seu CPF"
                                            isInvalid={!!errors.cpf}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.cpf}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg={3}>
                                    <Form.Group>
                                        <Form.Label>Contato</Form.Label>
                                        <Form.Control
                                            className="border-secondary"
                                            type="text"
                                            name="contato"
                                            value={atividade.contato}
                                            onChange={handleChange}
                                            placeholder="(00) 00000-0000"
                                            isInvalid={!!errors.contato}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.contato}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

            {/* Container para Local onde será realizado */}
            <Container className="mt-2">
                <Card>
                    <Card.Header as="h4">Local onde será realizado</Card.Header>
                    <Card.Body>
                        <Row className="align-items-center mb-3">
                            <Col lg={7}>
                                <Form.Group>
                                    <Form.Label>Endereço</Form.Label>
                                    <Form.Control
                                        className="border-secondary"
                                        type="text"
                                        name="endereco"
                                        value={atividade.endereco}
                                        onChange={handleChange}
                                        placeholder="Digite o seu endereço"
                                        isInvalid={!!errors.endereco}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.endereco}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group>
                                    <Form.Label>Bairro</Form.Label>
                                    <Form.Control
                                        className="border-secondary"
                                        type="text"
                                        name="bairro"
                                        value={atividade.bairro}
                                        onChange={handleChange}
                                        placeholder="Digite o seu bairro"
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={1}>
                                <Form.Group>
                                    <Form.Label>Número</Form.Label>
                                    <Form.Control
                                        className="border-secondary"
                                        type="text"
                                        name="numero"
                                        value={atividade.numero}
                                        onChange={handleChange}
                                        placeholder="S/N"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>

            {/* Container para Detalhes da Atividade Sustentável */}
            <Container className="mt-2">
                <Card>
                    <Card.Header as="h4">Detalhes da Atividade Sustentável</Card.Header>
                    <Card.Body>
                        <Row className="align-items-center mb-3">
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Tipo da Atividade Sustentável</Form.Label>
                                    <Form.Select
                                        className="border-secondary"
                                        name="tipoAtividade"
                                        value={atividade.tipoAtividade}
                                        onChange={handleChange}
                                        isInvalid={!!errors.tipoAtividade}
                                    >
                                        <option value="">Selecione o Tipo de Atividade</option>
                                        {tiposAtividades.map((tipo) => (
                                            <option key={tipo.id} value={tipo.id}>
                                                {tipo.nome}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.tipoAtividade}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg={2}>
                                <Form.Group>
                                    <Form.Label>Data</Form.Label>
                                    <Form.Control
                                        className="border-secondary"
                                        type="date"
                                        name="data"
                                        value={atividade.data}
                                        onChange={handleChange}
                                        isInvalid={!!errors.data}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.data}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg={2}>
                                <Form.Group>
                                    <Form.Label>Horário Inicial</Form.Label>
                                    <Form.Control
                                        className="border-secondary"
                                        type="time"
                                        name="horaInicial"
                                        value={atividade.horaInicial}
                                        onChange={handleChange}
                                        isInvalid={!!errors.horaInicial}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.horaInicial}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg={2}>
                                <Form.Group>
                                    <Form.Label>Horário Final</Form.Label>
                                    <Form.Control
                                        className="border-secondary"
                                        type="time"
                                        name="horaFinal"
                                        value={atividade.horaFinal}
                                        onChange={handleChange}
                                        isInvalid={!!errors.horaFinal}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.horaFinal}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="align-items-center mb-3">
                            <Col lg={12}>
                                <Form.Group>
                                    <Form.Label>Descrição Completa da Atividade</Form.Label>
                                    <Form.Control
                                        className="border-secondary"
                                        as="textarea"
                                        rows={3}
                                        name="descricao"
                                        value={atividade.descricao}
                                        onChange={handleChange}
                                        placeholder="Descrição completa da atividade"
                                        isInvalid={!!errors.descricao}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.descricao}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="align-items-center d-md-flex justify-content-md-center">
                            <Col lg={2}>
                                <Button variant="success" type="submit" className="w-100">
                                    <FaSave /> Salvar
                                </Button>
                            </Col>
                            <Col lg={2}>
                                <Button variant="danger" onClick={handleCancelar} className="w-100">
                                    <FaTimes /> Cancelar
                                </Button>
                            </Col>
                            <Col lg={2}>
                                    <Button variant="secondary" className="w-100" onClick={handleFiltrar}>
                                        <FaSearch /> Pesquisar
                                    </Button>
                                </Col>
                        </Row>

                        {sucessoMensagem && (
                            <Alert variant="success" className="mt-3">
                                {sucessoMensagem}
                            </Alert>
                        )}
                        {erro && (
                            <Alert variant="danger" className="mt-3">
                                {erro}
                            </Alert>
                        )}
                    </Card.Body>
                </Card>
            </Container>
            
            <Container className="mt-2">
                    <Card>
                        <Card.Header as="h5">Atividades Cadastradas</Card.Header>
                        <Card.Body>
                            {tiposAtividades !== null && (
                                <Table className='border-success mt-2'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th colSpan={3}>Nome da Solicitante</th>
                                            <th colSpan={2}>CPF</th>
                                            <th colSpan={2}>Contato</th>
                                            <th colSpan={2}>Data</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tiposAtividades.length <= 0 ? (
                                            <tr>
                                                <td colSpan="3" className="text-center">Nenhum item para listar</td>
                                            </tr>
                                        ) : (
                                            tiposAtividades.map((atividade) => (
                                                <tr key={atividade.id}>
                                                    <td>{atividade.id}</td>
                                                    <td colSpan={3}>{atividade.nome}</td>
                                                    <td colSpan={2}>{atividade.cpf}</td>
                                                    <td colSpan={2}>{atividade.contato}</td>
                                                    <td colSpan={2}>{atividade.data}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            )}
                        </Card.Body>
                    </Card>
                </Container>
        </div>
    );
}

export default CriarAtivSust;
