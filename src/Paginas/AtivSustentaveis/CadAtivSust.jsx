import React, { useState } from 'react';
import { Button, Card, Col, Row, Form, Container, Table, Alert, InputGroup } from 'react-bootstrap';
import { FaListAlt, FaSearch, FaTrash, FaEdit, FaBackspace, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import BtnCadastrar from '../../Componentes/BtnCadastrar.jsx';


function CadAtivSust() {
    const listaAtivSustInicial = [
        { id: 1, nomeAtivSust: 'Campanhas de reflorestamento e plantio de árvores em áreas urbanas e rurais.' },
        { id: 2, nomeAtivSust: 'Programas de coleta de materiais recicláveis como papel, plástico, vidro e metal.' },
        { id: 3, nomeAtivSust: 'Pontos de coleta para o descarte seguro de equipamentos eletrônicos.' },
        { id: 4, nomeAtivSust: 'Desenvolvimento de hortas urbanas e comunitárias para promover a agricultura local.' },
        { id: 5, nomeAtivSust: 'Sistemas de produção que integram árvores, cultivos agrícolas e pecuária de forma sustentável.' },
        { id: 6, nomeAtivSust: 'Desenvolvimento de infraestrutura para ciclistas.' },
        { id: 7, nomeAtivSust: 'Incentivo para a implementação de práticas ambientais em instituições de ensino.' },
        { id: 8, nomeAtivSust: 'Sessões educativas sobre práticas sustentáveis e proteção ambiental.' },
        { id: 9, nomeAtivSust: 'Utilização de resíduos orgânicos para a produção de biogás.' },
        { id: 10, nomeAtivSust: 'Incentivo para a implementação de práticas ambientais em escolas.' },
    ];

    const [mostrarAtivSust, setMostrarAtivSust] = useState(false);
    const [pesquisa, setPesquisa] = useState('');
    const [listaOriginal, setListaOriginal] = useState(listaAtivSustInicial);
    const [listaAtivSust, setListaAtivSust] = useState(listaAtivSustInicial);
    const [novaAtividade, setNovaAtividade] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [editandoAtividade, setEditandoAtividade] = useState(null);

    const alternarVisibilidade = () => {
        setMostrarAtivSust(!mostrarAtivSust);
    };

    const limparAtividades = () => {
        setMostrarAtivSust(false);
        setPesquisa('');
        setListaAtivSust(listaOriginal); // Restaura a lista original.
    };

    const handlePesquisa = () => {
        if (pesquisa.trim() === '') {
            setListaAtivSust(listaOriginal); // Restaura a lista original.
        } else {
            const listaFiltrada = listaOriginal.filter(item =>
                item.nomeAtivSust.toLowerCase().includes(pesquisa.toLowerCase())
            );
            setListaAtivSust(listaFiltrada);
        }
    };

    const handleCadastrar = () => {
        setErro('');
        setSucesso('');
        if (novaAtividade.trim() === '') {
            setErro('O campo não pode ficar em branco.');
            return;
        }
        if (novaAtividade.trim().length < 20) {
            setErro('A atividade deve ter no mínimo 20 caracteres.');
            return;
        }
        if (editandoAtividade) {
            const novaLista = listaOriginal.map(item =>
                item.id === editandoAtividade.id ? { ...item, nomeAtivSust: novaAtividade } : item
            );
            setListaOriginal(novaLista); // Atualiza a lista original.
            setListaAtivSust(novaLista); // Atualiza a lista exibida.
            setEditandoAtividade(null);
            setSucesso('Atividade editada com sucesso.');
        } else {
            const novaLista = [...listaOriginal, { id: listaOriginal.length + 1, nomeAtivSust: novaAtividade }];
            setListaOriginal(novaLista); // Atualiza a lista original.
            setListaAtivSust(novaLista); // Atualiza a lista exibida.
            setSucesso('Atividade cadastrada com sucesso.');
        }
        setNovaAtividade('');
        setTimeout(() => setSucesso(''), 3000); // Remove a mensagem de sucesso após 3 segundos
    };

    const handleExcluir = (id) => {
        const novaLista = listaOriginal.filter(item => item.id !== id);
        setListaOriginal(novaLista); // Atualiza a lista original.
        setListaAtivSust(novaLista); // Atualiza a lista exibida.
    };

    const handleEditar = (atividade) => {
        setNovaAtividade(atividade.nomeAtivSust);
        setEditandoAtividade(atividade);
    };

    const handleCancelar = () => {
        setNovaAtividade('');
        setEditandoAtividade(null);
        setErro('');
    };

    const getInputBorderClass = () => {
        if (erro) return 'border-danger';
        if (editandoAtividade) return 'border-primary';
        if (novaAtividade.trim().length >= 20) return 'border-success';
        return 'border-secondary';
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
                                            value={pesquisa}
                                            onChange={(e) => setPesquisa(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={2}>
                                    <Button variant="secondary" className="w-100" onClick={() => { handlePesquisa(); alternarVisibilidade(); }}>
                                        <FaSearch /> Pesquisar
                                    </Button>
                                </Col>
                                <Col lg={2}>
                                    <Button variant="secondary" className="w-100" onClick={limparAtividades}>
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
                                                className={`border ${getInputBorderClass()}`}
                                                type="text"
                                                placeholder="Digite uma nova atividade"
                                                value={novaAtividade}
                                                onChange={(e) => {
                                                    setNovaAtividade(e.target.value);
                                                    if (e.target.value.trim().length >= 20) {
                                                        setErro('');
                                                    }
                                                }}
                                            />
                                            {erro && (
                                                <InputGroup.Text className="bg-white border-0">
                                                    <FaExclamationCircle className='text-danger'></FaExclamationCircle>
                                                </InputGroup.Text>
                                            )}
                                        </InputGroup>
                                        {erro && novaAtividade.trim().length < 20 && <div className="text-danger">{erro}</div>}
                                    </Form.Group>
                                </Col>
                                <Col lg={2}>
                                    <BtnCadastrar
                                        editandoAtividade={editandoAtividade}
                                        handleCadastrar={handleCadastrar}
                                        handleCancelar={handleCancelar}
                                    />
                                </Col>
                                <Col lg={2}>
                                    {editandoAtividade && (
                                        <Button className='btn w-100' variant='danger' onClick={handleCancelar}>
                                            <FaTimes /> Cancelar
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                            {sucesso && <Alert variant="success" className="mt-3">{sucesso}</Alert>}
                        </Card.Body>
                    </Card>
                </Container>
                {mostrarAtivSust && (
                    <Container className='mt-2'>
                        <Card>
                            <Card.Header as='h4'> Atividades Cadastradas:</Card.Header>
                            <Card.Body>
                                <Table className='border-success mt-2'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th colSpan={3}>Nome da Atividade Sustentável</th>
                                            <th colSpan={2}>Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaAtivSust.map(ativSust => (
                                            <tr key={ativSust.id}>
                                                <td>{ativSust.id}</td>
                                                <td colSpan={3}>{ativSust.nomeAtivSust}</td>
                                                <td><FaEdit className='text-primary' onClick={() => handleEditar(ativSust)} /></td>
                                                <td><FaTrash className='text-danger' onClick={() => handleExcluir(ativSust.id)} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Container>
                )}
            </div>
        </>
    );
}

export default CadAtivSust;
