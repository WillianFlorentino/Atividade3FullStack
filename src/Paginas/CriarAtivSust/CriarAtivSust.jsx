import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Form, Container, Alert, Table } from 'react-bootstrap';
import { FaListAlt, FaSave, FaTimes, FaSearch } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import AtivSustService from '../../services/AtivSustService.js'; // Certifique-se de que o caminho está correto
import CaixaSelecao from '../../Componentes/CaixaSelecaoTipoAtividade.js';

const ativSustService = new AtivSustService(); // Instância do serviço

function CriarAtivSust() {
    const [atividade, setAtividade] = useState({
        id: 0,
        criar_nome: "",
        criar_cpf: 0,
        criar_contato: 0,
        criar_endereco: "",
        criar_bairro: "",
        criar_numero: 0,
        tipoAtividade: {
            id: 0,
            nome: ""
        },
        criar_data: "",
        criar_horarioInicial: "",
        criar_horarioFinal: "",
        criar_descricao: ""
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
    const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);

    // Função que vai receber o item selecionado
const handleSelecaoAtividade = (atividade) => {
    console.log('Atividade selecionada:', atividade);
    setAtividade({ ...atividade, tipoAtividade: { id: atividade.id, nome: atividade.nome } });
};



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
        const carregarTiposAtividades = async () => {
            try {
                const tipos = await ativSustService.obterTodos(); // Verifique se este é o método correto para obter tipos
                setTiposAtividades(tipos);
            } catch (error) {
                console.error('Erro ao carregar tipos de atividades:', error);
                setErro('Erro ao carregar tipos de atividades.');
            }
        };
    
        const carregarAtividades = async () => {
            await listarAtividades(); // Carregar atividades quando o componente montar
        };
    
        carregarTiposAtividades();
        carregarAtividades(); // Chamada para listar atividades
    
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
        console.log(`Atualizando ${name} com valor ${value}`);
        setAtividade((prev) => ({ ...prev, [name]: value }));
        console.log(atividade); // Verificar o estado do formulário após cada atualização
      };

    const validateFields = () => {
        const newErrors = {};
    
        if (!atividade.criar_nome) newErrors.nome = 'O Nome não pode estar vazio.';
        if (!atividade.criar_cpf) newErrors.cpf = 'O CPF não pode estar vazio.';
        if (!atividade.criar_contato) newErrors.contato = 'O Contato não pode estar vazio.';
        if (!atividade.criar_endereco) newErrors.endereco = 'O Endereço não pode estar vazio.';
        if (!atividade.criar_bairro) newErrors.bairro = 'O Endereço não pode estar vazio.';
        if (!atividade.tipoAtividade || !atividade.tipoAtividade.id) {
            newErrors.tipoAtividade = 'Selecione um tipo de atividade.';
        }
        if (!atividade.criar_data) newErrors.data = 'A Data é obrigatória.';
        if (!atividade.criar_horarioInicial) newErrors.horarioInicial = 'A Hora Inicial é obrigatória.';
        if (!atividade.criar_horarioFinal) newErrors.horarioFinal = 'A Hora Final é obrigatória.';
        if (!atividade.criar_descricao) newErrors.descricao = 'A Descrição é obrigatória.';
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSalvar = async (event) => {
        event.preventDefault();
        console.log(`Salvando atividade com CPF ${atividade.criar_cpf}`);
        
        console.log('Valor do campo nome:', atividade.criar_nome); // Alterado para criar_nome
        console.log('Valor do campo tipoAtividade:', atividade.tipoAtividade);
        console.log('Valor do campo criar_data:', atividade.criar_data);
        console.log('Valor do campo criar_numero:', atividade.criar_numero);
        console.log('Valor do campo criar_horarioInicial:', atividade.criar_horarioInicial);
        console.log('Valor do campo criar_horarioFinal:', atividade.criar_horarioFinal);
        console.log('Valor do campo criar_descricao:', atividade.criar_descricao);
        console.log('Valor do campo cpf:', atividade.criar_cpf);
        console.log('Valor do campo contato:', atividade.criar_contato);
        console.log('Valor do campo endereço:', atividade.criar_endereco);
        
        const isValid = validateFields();
        
        if (!isValid) {
          return;
        }
        
        try {
          const tipoAtividadeId = atividade.tipoAtividade.id;
          const dados = {
            id: atividade.id,
            criar_nome: atividade.criar_nome,
            criar_cpf: atividade.criar_cpf,
            criar_contato: atividade.criar_contato,
            criar_endereco: atividade.criar_endereco,
            criar_bairro: atividade.criar_bairro,
            criar_numero: atividade.criar_numero,
            tipoAtividade: {
              id: atividade.tipoAtividade.id,
              nome: atividade.tipoAtividade.nome
            },
            criar_data: atividade.criar_data,
            criar_horarioInicial: atividade.criar_horarioInicial,
            criar_horarioFinal: atividade.criar_horarioFinal,
            criar_descricao: atividade.criar_descricao,
          };
          
          if (!idAtivSust) {
            const response = await ativSustService.adicionar(dados);
            console.log('Resposta do servidor:', response); // Adicione este console.log()
            console.log('Atividade salva:', response); // Log da resposta
            setSucessoMensagem('Atividade cadastrada com sucesso!');
          } else {
            await ativSustService.atualizar(idAtivSust, dados);
            setSucessoMensagem('Atividade atualizada com sucesso!');
          }
          await listarAtividades();
          navigate('/criarativsust'); // Mova o redirecionamento para aqui
          
        } catch (error) {
          console.error('Erro ao salvar a atividade:', error);
          if (error.response) {
            console.error('Detalhes do erro:', error.response.data);
          }
          setErro('Erro ao salvar a atividade. Verifique se os dados estão corretos.');
        }
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
                                name="criar_nome"
                                value={atividade.criar_nome}
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
                                name="criar_cpf"
                                value={atividade.criar_cpf}
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
                                name="criar_contato"
                                value={atividade.criar_contato}
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

                {/* Container para Local onde será realizado */}
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
                                        name="criar_endereco"
                                        value={atividade.criar_endereco}
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
                                        name="criar_bairro"
                                        value={atividade.criar_bairro}
                                        onChange={handleChange}
                                        placeholder="Digite o seu bairro"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.bairro}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg={1}>
                                <Form.Group>
                                    <Form.Label>Número</Form.Label>
                                    <Form.Control
                                        className="border-secondary"
                                        type="text"
                                        name="criar_numero"
                                        value={atividade.criar_numero}
                                        onChange={handleChange}
                                        placeholder="S/N"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Container para Detalhes da Atividade Sustentável */}
                <Card>
                    <Card.Header as="h4">Detalhes da Atividade Sustentável</Card.Header>
                    <Card.Body>
                        <Row className="align-items-center mb-3">
                            <Col lg={6}>
                                <Form.Group controlId="formTipoAtividade">
                                    <Form.Label>Tipo de Atividade</Form.Label>
                                    <CaixaSelecao
                                        enderecoFonteDados="http://localhost:3001/cadtipoativsust"
                                        campoChave="id"
                                        campoExibicao="nome"
                                        funcaoSelecao={handleSelecaoAtividade}
                                        localLista={tiposAtividades}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={2}>
                                <Form.Group>
                                    <Form.Label>Data</Form.Label>
                                    <Form.Control
                                        className="border-secondary"
                                        type="date"
                                        name="criar_data"
                                        value={atividade.criar_data}
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
                                        name="criar_horarioInicial"
                                        value={atividade.criar_horarioInicial}
                                        onChange={handleChange}
                                        isInvalid={!!errors.horarioInicial}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.horarioInicial}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col lg={2}>
                                <Form.Group>
                                    <Form.Label>Horário Final</Form.Label>
                                    <Form.Control
                                        className="border-secondary"
                                        type="time"
                                        name="criar_horarioFinal"
                                        value={atividade.criar_horarioFinal}
                                        onChange={handleChange}
                                        isInvalid={!!errors.horarioFinal}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.horarioFinal}
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
                                        name="criar_descricao"
                                        value={atividade.criar_descricao}
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
                                <Button variant="danger" onClick={handleCancelar} className="w-100">
                                    <FaTimes /> Cancelar
                                </Button>
                            </Col>
                            <Col lg={2}>
                                <Button variant="secondary" className="w-100" onClick={handleFiltrar}>
                                    <FaSearch /> Pesquisar
                                </Button>
                            </Col>
                            <Col lg={2}>
                                <Button variant="success" type="submit" className="w-100">
                                    <FaSave /> Salvar
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
            </Form>
        </Card.Body>
    </Card>
</Container>

            
            <Container className="mt-2">
    <Card>
        <Card.Header as="h5">Atividades Cadastradas</Card.Header>
        <Card.Body>
            {listaAtividades && listaAtividades.length > 0 ? (
                <Table className='border-success mt-2'>
<thead>
    <tr>
        <th>ID</th>
        <th colSpan={3}>Nome da Solicitante</th>
        <th colSpan={2}>CPF</th>
        <th colSpan={2}>Contato</th>
        <th colSpan={2}>Data</th>
        <th colSpan={2}>Atividade</th>
    </tr>
</thead>
<tbody>
    {listaAtividades.map((atividade) => (
        <tr key={atividade.criar_id}>
            <td>{atividade.criar_id}</td>
            <td colSpan={3}>{atividade.criar_nome}</td>
            <td colSpan={2}>{atividade.criar_cpf}</td>
            <td colSpan={2}>{atividade.criar_contato}</td>
            <td colSpan={2}>{atividade.criar_data}</td>
            <td colSpan={2}>{atividade.tipo_atividade}</td> {}
        </tr>
    ))}
</tbody>

                </Table>
            ) : (
                <div className="text-center">Nenhum item para listar</div>
            )}
        </Card.Body>
    </Card>
</Container>


        </div>
    );
}

export default CriarAtivSust;
