import { Button, Col, Form, Row, Container, Table, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaTrashAlt, FaListAlt } from 'react-icons/fa'
import { useEffect, useState } from 'react';

import './formcolab.css'


function FormColab() {
    const [showMensagem, setshowMensagem] = useState(false)
    const [validated, setValidated] = useState(false);
    const [descricao, setDescricao] = useState("");
    const [cpf, setCpf] = useState("");
    const [numero, setNumero] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [endereco, setEndereco] = useState("");
    const [bairro, setBairro] = useState("");
    const [numeroCasa, setNumeroCasa] = useState("");
    const [cargo, setCargo] = useState("");
    const [anosExperiencia, setAnosExperiencia] = useState("");
    const [nivelEscolaridade, setNivelEscolaridade] = useState("");

    const [errors, setErrors] = useState({});

    const [listaColaboradores, setListaColaboradores] = useState([]);

    useEffect(() => {
        const listaSalva = localStorage.getItem('colaborador');
        if (listaSalva != null) {
            setListaColaboradores(JSON.parse(listaSalva))
        }

    }, [])

    const handleExcluir = (id) => {
        const novosColaboradores = listaColaboradores.filter(colaborador => colaborador.id !== id);
        setListaColaboradores(novosColaboradores);
        localStorage.setItem('colaborador', JSON.stringify(novosColaboradores))
    }

    const hadleDescricaoChange = (e) => {
        const value = e.target.value;
        setDescricao(value);
        if (value && value.length <= 50) {
            setErrors((prev) => ({ ...prev, descricao: null }));
        } else {

            if (value === "") {
                setErrors((prev) => ({ ...prev, descricao: 'O campo não pode estar vazio.' }));
            } else {
                setErrors((prev) => ({ ...prev, descricao: 'O campo não aceita mais de 50 caracteres.' }));
            }

        }
    };

    const handleCpfChange = (event) => {
        let value = event.target.value;
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        setCpf(value);
        if (value && value.length < 14) {
            setErrors((prev) => ({ ...prev, cpf: 'O campo deve ter 11 números.' }));
        } else if (value && value.length > 14) {
            setErrors((prev) => ({ ...prev, cpf: 'O campo não aceita mais de 11 números.' }));
        } else {
            setErrors((prev) => ({ ...prev, cpf: null }));
        }
    };

    const handleNumeroChange = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        setNumero(value);
        if (value && value.length < 15) {
            setErrors((prev) => ({ ...prev, numero: 'O campo deve ter 11 números.' }));
        } else if (value.length > 15) {
            setErrors((prev) => ({ ...prev, numero: 'O campo não aceita mais de 11 números.' }));
        } else {
            setErrors((prev) => ({ ...prev, numero: null }));
        }
    };

    const hadleEnderecoChange = (e) => {
        const value = e.target.value;
        setEndereco(value);
        if (value && value.length <= 50) {
            setErrors((prev) => ({ ...prev, endereco: null }));
        } else {

            if (value === "") {
                setErrors((prev) => ({ ...prev, endereco: 'O campo não pode estar vazio.' }));
            } else {
                setErrors((prev) => ({ ...prev, endereco: 'O campo não aceita mais de 50 caracteres.' }));
            }

        }
    };

    const hadleBairroChange = (e) => {
        const value = e.target.value;
        setBairro(value);
        if (value && value.length <= 50) {
            setErrors((prev) => ({ ...prev, bairro: null }));
        } else {

            if (value === "") {
                setErrors((prev) => ({ ...prev, bairro: 'O campo não pode estar vazio.' }));
            } else {
                setErrors((prev) => ({ ...prev, bairro: 'O campo não aceita mais de 50 caracteres.' }));
            }

        }
    };

    const hadleNumeroCasaChange = (e) => {
        const value = e.target.value;
        setNumeroCasa(value);
        if (value && value.length <= 50) {
            setErrors((prev) => ({ ...prev, numeroCasa: null }));
        } else {

            if (value === "") {
                setErrors((prev) => ({ ...prev, numeroCasa: 'O campo não pode estar vazio.' }));
            } else {
                setErrors((prev) => ({ ...prev, numeroCasa: 'O campo não aceita mais de 50 caracteres.' }));
            }

        }
    };


    const hadleDataNascimentoChange = (e) => {
        const value = e.target.value;
        setDataNascimento(value);
        if (value && new Date(value) < new Date()) {

            setErrors((prev) => ({ ...prev, dataNascimento: null }));
        } else {

            if (value === "") {
                setErrors((prev) => ({ ...prev, dataNascimento: 'A data não pode ser vazia' }));
            } else {
                setErrors((prev) => ({ ...prev, dataNascimento: 'Não é permitido data futura.' }));
            }

        }
    }

    const handleCargoChange = (event) => {
        setCargo(event.target.value);
    };


    const handleAnosExperienciaChange = (event) => {
        setAnosExperiencia(event.target.value);
    };

    const handleNivelEscolaridadeChange = (event) => {
        setNivelEscolaridade(event.target.value);
    };



    function handleSalvar(event) {
        event.preventDefault();
        const form = event.currentTarget;
        let newErros = {};

        if (form.checkValidity() === false) {
            event.stopPropagation()
        }
        if (!descricao) {
            newErros.descricao = 'O campo não pode estar vazio.'
        } else if (descricao.length > 50) {
            newErros.descricao = 'O campo não aceita mais de 50 caracteres.'
        }

        if (!endereco) {
            newErros.endereco = 'O campo não pode estar vazio.'
        } else if (endereco.length > 50) {
            newErros.endereco = 'O campo não aceita mais de 50 caracteres.'
        }

        if (!bairro) {
            newErros.bairro = 'O campo não pode estar vazio.'
        } else if (bairro.length > 50) {
            newErros.bairro = 'O campo não aceita mais de 50 caracteres.'
        }

        if (!numeroCasa) {
            newErros.numeroCasa = 'O campo não pode estar vazio.'
        } else if (numeroCasa.length > 6) {
            newErros.numeroCasa = 'O campo não aceita mais de 5 digitos.'
        }

        if (!cpf) {
            newErros.cpf = 'O campo não pode estar vazio.'
        } else if (cpf.length > 14) {
            newErros.cpf = 'O campo não aceita mais de 11 números.'
        }

        if (!numero) {
            newErros.numero = 'O campo não pode estar vazio.'
        } else if (numero.length > 15) {
            newErros.numero = 'O campo não aceita mais de 11 números.'
        }

        if (!dataNascimento) {
            newErros.dataNascimento = 'A data não pode ser vazia.'
        } else if (new Date(dataNascimento) > new Date()) {
            newErros.dataNascimento = 'Não é permitido data futura.'
        }

        if (Object.keys(newErros).length > 0) {

            setErrors(newErros)
        } else {
            const colaborador = {
                id: 0,
                nome: form.nome.value,
                cpf: form.cpf.value,
                contato: form.contato.value,
                endereco: form.endereco.value,
                bairro: form.bairro.value,
                numero: form.numero.value,
                dataNascimento: form.dataNascimento.value,
                cargo: cargo,
                anosExperiencia: anosExperiencia,
                nivelEscolaridade: nivelEscolaridade


            }

            const listaSalva = localStorage.getItem('colaborador');
            const colaboradores = listaSalva == null ? [] : JSON.parse(listaSalva);
            colaborador.id = colaboradores.length + 1;
            colaboradores.push(colaborador);
            localStorage.setItem('colaborador', JSON.stringify(colaboradores))




            setshowMensagem(true)
        }

        setValidated(true)
    }

    return (
        
        
        <>
        <Container className='form-colab'>
            <h2 className="text-center mb-4"><FaListAlt /> CADASTRO DE COLABORADORES</h2>
            <Col class="card borda">
                <h5 class="card-header">Informações Pessoais</h5>
                <hr /> { }
                <Col class="card-body">

                    <Form noValidate validated={validated} onSubmit={handleSalvar}>
                        <Row>
                            <Col lg='1' className='mt-3'>
                                <Form.Label>ID</Form.Label>
                                <Col class="input-group mb-3">
                                    <Form.Control type="text" class="form-control" placeholder="ID" aria-label="ID" aria-describedby="basic-addon2" disabled />
                                </Col>
                            </Col>

                            <Col lg='3' className='mt-3'>
                                <Form.Group controlId='nome'>
                                    <Form.Label>Nome</Form.Label>
                                    <Col class="input-group mb-3">
                                        <Form.Control type="text" class="form-control" placeholder="Nome do Colaborador" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            required
                                            value={descricao}
                                            isInvalid={!!errors.descricao}
                                            onChange={hadleDescricaoChange}
                                            name="nome"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.descricao}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg='3' className='mt-3'>
                                <Form.Group controlId='cpf'>
                                    <Form.Label>CPF</Form.Label>
                                    <Col className="input-group mb-3">
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            placeholder="CPF do Colaborador"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            required
                                            value={cpf}
                                            isInvalid={!!errors.cpf}
                                            onChange={handleCpfChange}
                                            name='cpf'
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.cpf}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col lg='3' className='mt-3'>
                                <Form.Group controlId='contato'>
                                    <Form.Label>Contato</Form.Label>
                                    <Col className="input-group mb-3">
                                        <Form.Control
                                            type="text" 
                                            className="form-control"
                                            placeholder="(XX) XXXXX-XXXX"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            id="contact-input"
                                            required
                                            name='contato'
                                            value={numero}
                                            isInvalid={!!errors.numero}
                                            onChange={handleNumeroChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.numero}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="4" className='mt-3'>
                                <Form.Group controlId='endereco'>
                                    <Form.Label>Endereço</Form.Label>
                                    <Col class="input-group mb-3">
                                        <Form.Control type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2"
                                            required
                                            name='endereco'
                                            value={endereco}
                                            isInvalid={!!errors.endereco}
                                            onChange={hadleEnderecoChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.endereco}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col lg="3" className='mt-3'>
                                <Form.Group controlId='bairro'>
                                    <Form.Label>Bairro</Form.Label>
                                    <Col class="input-group mb-2">
                                        <Form.Control type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2"
                                            required
                                            value={bairro}
                                            name='bairro'
                                            isInvalid={!!errors.bairro}
                                            onChange={hadleBairroChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.bairro}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col lg="2" className='mt-3'>
                                <Form.Group controlId='numero'>
                                    <Form.Label>Número da Casa</Form.Label>
                                    <Col class="input-group mb-3">
                                        <Form.Control type="number" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2"
                                            required
                                            value={numeroCasa}
                                            name='numero'
                                            isInvalid={!!errors.numeroCasa}
                                            onChange={hadleNumeroCasaChange}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.numeroCasa}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col lg="2" className='mt-3'>
                                <Form.Group controlId='dataNascimento'>
                                    <Form.Label style={{ whiteSpace: 'nowrap' }}>Data de Nascimento</Form.Label>
                                    <Col className="input-group mb-3">
                                        <Form.Control type="date" className="form-control" aria-label="Data de Nascimento" aria-describedby="basic-addon2"
                                            onChange={hadleDataNascimentoChange}
                                            required
                                            name='dataNascimento'
                                            value={dataNascimento}
                                            isInvalid={!!errors.dataNascimento}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.dataNascimento}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>

                        </Row>

                        <hr /> { }
                        <h5>Informações Profissionais</h5> { }

                        <Row className='row' >
                            <Col lg='3' className='mt-3'>
                                <Form.Group controlId='cargo'>
                                    <Col class="input-group mb-3">
                                        <Form.Label>Cargo</Form.Label>
                                        <Form.Select required className="form-select"
                                            onChange={handleCargoChange}
                                            value={cargo}
                                        >
                                            <option value="">Selecione...</option>
                                            <option value="Secretário">Secretário</option>
                                            <option value="Acessor">Acessor</option>
                                            <option value="Fiscal">Fiscal</option>
                                            <option value="Auxíliar">Auxíliar</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Selecione um Cargo
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg='3' className=' mt-3'>
                                <Form.Label>Descrição</Form.Label>
                                <Col class="input-group mb-3">
                                    <Form.Control required type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Preencha o Campo
                                    </Form.Control.Feedback>
                                </Col>
                            </Col>
                            <Col lg='2' className='mt-3'>
                                <Form.Group controlId='anos'>
                                    <Col class="input-group mb-3">
                                        <Form.Label style={{ whiteSpace: 'nowrap' }}>Anos de Experiência</Form.Label>
                                        <Form.Control type="number" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon2"
                                            required
                                            onChange={handleAnosExperienciaChange}
                                            value={anosExperiencia}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Preencha o Campo
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>

                        </Row>

                        <hr /> { }

                        <Row>
                            <h5>Formação Acadêmica</h5> { }

                            <Col lg='3'>
                                <Form.Group controlId='escolaridade'>
                                    <Col className="mb-3 mt-4">
                                        <Form.Label>Nível de Escolaridade</Form.Label>
                                        <Form.Select required className="form-select"
                                            onChange={handleNivelEscolaridadeChange}
                                            value={nivelEscolaridade}
                                        >
                                            <option value="">Selecione...</option>
                                            <option value="Ensino Fundamental">Ensino Fundamental</option>
                                            <option value="Ensino Médio">Ensino Médio</option>
                                            <option value="Ensino Técnico">Ensino Técnico</option>
                                            <option value="Ensino Superior">Ensino Superior</option>
                                            <option value="Pós-graduação">Pós-graduação</option>
                                            <option value="Mestrado">Mestrado</option>
                                            <option value="Doutorado">Doutorado</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Selecione um nível de Escolaridade
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Alert className="alert-success-custom" variant='sucess' show={showMensagem}> <b> <FaCheckCircle></FaCheckCircle> </b>Colaborador Cadastrado com Sucesso!</Alert>
                        </Row>


                        <Col className='row justify-content-center'>
                            <Col className='col-auto'>
                                <Button type="submit" variant='sucess m-1' className="btn btn-success btn-lg me-2">Cadastrar</Button>
                            </Col>
                        </Col>
                    </Form>

                </Col>
            </Col>

            <Container className="custom-table-container mx-0">
                <Table striped bordered hover className="table mt-5 custom-table">
                    <thead>
                        <tr>
                            <th scope="col" className="w-5">ID</th>
                            <th scope="col" className="w-15">Nome</th>
                            <th scope="col" className="w-15">CPF</th>
                            <th scope="col" className="w-20">Contato</th>
                            <th scope="col" className="w-20">Endereço</th>
                            <th scope="col" className="w-20">Bairro</th>
                            <th scope="col">Número</th>
                            <th scope="col">Data de Nascimento</th>
                            <th scope="col">Cargo</th>
                            <th scope="col">Experiência</th>
                            <th scope="col">Escolaridade</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaColaboradores.length <= 0 ? (
                            <tr>
                                <td colSpan="13">Nenhum colaborador cadastrado</td>
                            </tr>
                        ) : (
                            listaColaboradores.map((colaborador, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'dark-green' : 'light-green'}>
                                    <td>{colaborador.id}</td>
                                    <td>{colaborador.nome}</td>
                                    <td>{colaborador.cpf}</td>
                                    <td>{colaborador.contato}</td>
                                    <td>{colaborador.endereco}</td>
                                    <td>{colaborador.bairro}</td>
                                    <td>{colaborador.numero}</td>
                                    <td>{colaborador.dataNascimento}</td>
                                    <td>{colaborador.cargo}</td>
                                    <td>{colaborador.anosExperiencia}</td>
                                    <td>{colaborador.nivelEscolaridade}</td>
                                    <td>
                                        <Button className='btn btn-danger btn-sm' onClick={() => handleExcluir(colaborador.id)} > <FaTrashAlt></FaTrashAlt>Excluir</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Container>
        </Container>
        
        </>

    
        

    );
}

export default FormColab;

