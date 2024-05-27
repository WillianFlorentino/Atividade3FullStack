import { Container, Card, Button, Row, Col, Form, FloatingLabel, Alert } from "react-bootstrap";
import { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import InputMask from 'react-input-mask';
import './AgendarCss/AgendarServicos.css';

function AgendarServicos() {
    const [showMensagem, setShowMensagem] = useState(false);
    const [validated, setValidated] = useState(false);
    const [nomeCadastro, setNome] = useState('');
    const [cpfCadastro, setCpf] = useState('');
    const [contatoCadastro, setContato] = useState('');
    const [enderecoCadastro, setEndereco] = useState('');
    const [numeroCadastro, setNumero] = useState('');
    const [bairroCadastro, setBairro] = useState('');
    const [cidadeCadastro, setCidade] = useState('');

    const [tipoServico, setTipoServico] = useState('');
    const [dataCadastro, setData] = useState('');
    const [horarioServico, setHorario] = useState('');
    const [referenciaServico, setReferencia] = useState('');
    const [descricaoServico, setDescricao] = useState('');

    const [errors, setErrors] = useState({});

    const handleNomeChange = (event) => {
        const value = event.target.value;
        setNome(value);
        if(value && value.length <= 100) {
            setErrors((prev) => ({...prev, nomeCadastro: ''}));
        } else {
            if(value === '') {
                setErrors((prev) => ({...prev, nomeCadastro: 'O campo precisa ser preenchido'}));
            } else {
                setErrors((prev) => ({...prev, nomeCadastro: 'Nome inválido'}));
            }
        }
    };

    const handleCpfChange = (event) => {
        const value = event.target.value;
        setCpf(value);
        if(value && /^[0-9]{11}$/.test(value.replace(/[^0-9]/g, ''))) {
            setErrors((prev) => ({...prev, cpfCadastro: ''}));
        } else {
            if(value === '') {
                setErrors((prev) => ({...prev, cpfCadastro: 'O campo precisa ser preenchido'}));
            } else {
                setErrors((prev) => ({...prev, cpfCadastro: 'CPF inválido'}));
            }
        }
    };

    const handleContatoChange = (event) => {
        const value = event.target.value;
        setContato(value);
        if(value && /^[0-9]{11}$/.test(value.replace(/[^0-9]/g, ''))) {
            setErrors((prev) => ({...prev, contatoCadastro: ''}));
        } else {
            if(value === '') {
                setErrors((prev) => ({...prev, contatoCadastro: 'O campo precisa ser preenchido'}));
            } else {
                setErrors((prev) => ({...prev, contatoCadastro: 'Contato inválido'}));
            }
        }
    };

    const handleEnderecoChange = (event) => {
        const value = event.target.value;
        setEndereco(value);
        if(value) {
            setErrors((prev) => ({...prev, enderecoCadastro: ''}));
        } else {
            if(value === '') {
                setErrors((prev) => ({...prev, enderecoCadastro: 'O campo precisa ser preenchido'}));
            } 

        }                                ////////////////////////////////removi o else
    };

    const handleNumeroChange = (event) => {
        const value = event.target.value;
        setNumero(value);
        if(value) {
            setErrors((prev) => ({...prev, numeroCadastro: ''}));
        } else {
            if(value === '') {
                setErrors((prev) => ({...prev, numeroCadastro: 'O campo precisa ser preenchido'}));
            } else {
                setErrors((prev) => ({...prev, numeroCadastro: 'Numero inválido'}));           ///////////////////////////////////////
            }
        }
    };

    const handleBairroChange = (event) => {
        const value = event.target.value;
        setBairro(value);
        if(value) {
            setErrors((prev) => ({...prev, bairroCadastro: ''}));
        } else {
            if(value === '') {
                setErrors((prev) => ({...prev, bairroCadastro: 'O campo precisa ser preenchido'}));
            } else {
                setErrors((prev) => ({...prev, bairroCadastro: ' Bairro inválido'}));
            }
        }
    };

    const handleCidadeChange = (event) => {
        const value = event.target.value;
        setCidade(value);
        if(value) {
            setErrors((prev) => ({...prev, cidadeCadastro: ''}));
        } else {
            if(value === '') {
                setErrors((prev) => ({...prev, cidadeCadastro: 'O campo precisa ser preenchido'}));
            } else {
                setErrors((prev) => ({...prev, cidadeCadastro: 'Cidade inválida'}));
            }
        }
    };

    const handleTipoServicoChange = (event) => {
        const value = event.target.value;
        setTipoServico(value);
        if(value) {
            setErrors((prev) => ({...prev, tipoServico: ''}));
        } else {
            if(value === '') {
                setErrors((prev) => ({...prev, tipoServico: 'O campo precisa ser preenchido'}));
            } else {
                setErrors((prev) => ({...prev, tipoServico: 'Tipo de Serviço inválido'}));
            }
        }
    };

    const handleDataChange = (event) => {
        const value = event.target.value;
        setData(value);
        if(value) {
            setErrors((prev) => ({...prev, dataCadastro: ''}));
        } else {
            if(value === '') {
                setErrors((prev) => ({...prev, dataCadastro: 'O campo precisa ser preenchido'}));
            } else {
                setErrors((prev) => ({...prev, dataCadastro: 'Data inválida'}));
            }
        }
    };

    const handleHorarioChange = (event) => {
        const value = event.target.value;
        setHorario(value);
        if(value) {
            setErrors((prev) => ({...prev, horarioCadastro: ''}));
        } else {
            if(value === '') {
                setErrors((prev) => ({...prev, horarioCadastro: 'O campo precisa ser preenchido'}));
            } else {
                setErrors((prev) => ({...prev, horarioCadastro: 'Horário inválido'}));
            }
        }
    };

    const handleReferenciaChange = (event) => {
        const value = event.target.value;
        setReferencia(value);
        if(value) {
            setErrors((prev) => ({...prev, referenciaServico: ''}));
        } else {
            if(value === '') {
                setErrors((prev) => ({...prev, referenciaServico: 'O campo precisa ser preenchido'}));
            } else {
                setErrors((prev) => ({...prev, referenciaServico: 'Referência inválida'}));
            }
        }
    };

    const handleDescricaoChange = (event) => {
        const value = event.target.value;
        setDescricao(value);
        if(value) {
            setErrors((prev) => ({...prev, descricaoServico: ''}));
        } else {
            if(value === '') {
                setErrors((prev) => ({...prev, descricaoServico: 'O campo precisa ser preenchido'}));
            } else {
                setErrors((prev) => ({...prev, descricaoServico: 'Descricão inválida'}));
            }
        }
    };

    function handleSalvar(event) {
        event.preventDefault();
        const form = event.currentTarget;
        let newErrors = {};

        if(form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        if(!nomeCadastro) {
            newErrors.nomeCadastro = 'O campo precisa ser preenchido';
        } else if(nomeCadastro.length > 100) {
            newErrors.nomeCadastro = 'Nome inválido';
        }

        const cpfNumeros = cpfCadastro.replace(/[^0-9]/g, '');
        if(!cpfNumeros) {
            newErrors.cpfCadastro = 'O campo precisa ser preenchido';
        } else if(cpfNumeros.length !== 11) {
            newErrors.cpfCadastro = 'CPF inválido';
        }

        const contatoNumeros = contatoCadastro.replace(/[^0-9]/g, '');
        if(!contatoNumeros) {
            newErrors.contatoCadastro = 'O campo precisa ser preenchido';
        } else if(contatoCadastro.length === 11) {
            newErrors.contatoCadastro = 'Contato inválido';
        }

        if(!enderecoCadastro) {
            newErrors.enderecoCadastro = 'O campo precisa ser preenchido';
        } else if(enderecoCadastro.length > 100) {
            newErrors.enderecoCadastro = 'Endereço inválido';
        }

        if(!numeroCadastro) {
            newErrors.numeroCadastro = 'O campo precisa ser preenchido';
        } else if(numeroCadastro.length > 10) {
            newErrors.numeroCadastro = 'Endereço inválido';
        }

        if(!bairroCadastro) {
            newErrors.bairroCadastro = 'O campo precisa ser preenchido';
        } else if(bairroCadastro.length > 100) {
            newErrors.bairroCadastro = 'Bairro inválido';
        }

        if(!cidadeCadastro) {
            newErrors.cidadeCadastro = 'O campo precisa ser preenchido';
        } else if(cidadeCadastro.length > 100) {
            newErrors.cidadeCadastro = 'Cidade inválida';
        }

        if(!tipoServico) {
            newErrors.servicoServicos = 'O campo precisa ser preenchido';
        } else if(tipoServico.length > 100) {
            newErrors.servicoServicos = 'Serviço inválido';
        }

        if(!dataCadastro) {
            newErrors.dataCadastro = 'O campo precisa ser preenchido';
        } else if(new Date(dataCadastro) < new Date()) {
            newErrors.dataCadastro = 'Não pode ser uma data passada';
        }

        if(!horarioServico) {
            newErrors.horarioServicos = 'O campo precisa ser preenchido';
        } else if(horarioServico.length > 100) {
            newErrors.horarioServicos = 'Horário inválido';
        }

        if(!referenciaServico) {
            newErrors.referenciaServicos = 'O campo precisa ser preenchido';
        } else if(referenciaServico.length > 500) {
            newErrors.referenciaServicos = 'Referência inválida';
        }

        if(!descricaoServico) {
            newErrors.descricaoServicos = 'O campo precisa ser preenchido';
        } else if(descricaoServico.length > 500) {
            newErrors.descricaoServicos = 'Descricão inválida';
        }

        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const agendamento = {
                id: 0,
                nome: nomeCadastro,
                cpf: cpfCadastro,
                contato: contatoCadastro,
                endereco: enderecoCadastro,
                numero: numeroCadastro,
                bairro: bairroCadastro,
                cidade: cidadeCadastro,
                tipoServico: tipoServico,
                data: dataCadastro,
                horario: horarioServico,
                referenciaespecial: referenciaServico,
                descricaoservico: descricaoServico
            };

            const listaSalva = localStorage.getItem('agendamentos');
            const agendamentos = listaSalva === null ? [] : JSON.parse(listaSalva);
            agendamento.id = agendamentos.length + 1;
            agendamentos.push(agendamento);
            localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

            setShowMensagem(true);
        }

        setValidated(true);
    }

    return (
        <>
            <Container className="container">
                <Card className="mt-4">
                    <h1 id="titulo">Agendar Serviços</h1>
                    
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={handleSalvar}>
                            <h5>Dados Pessoais</h5>
                            <Row className="espaco">
                                <Col lg='1'>
                                    <Form.Group className="mb-3" controlId="id">
                                        <Form.Label>ID:</Form.Label>
                                        <Form.Control type="text" placeholder="ID"/>
                                    </Form.Group>
                                </Col>

                                <Col lg='4'>
                                    <Form.Group className="mb-3" controlId="nomeCadastro"> 
                                        <Form.Label>Nome:</Form.Label>
                                        <Form.Control type="text" placeholder="Nome"
                                        required
                                        value={nomeCadastro}
                                        onChange={handleNomeChange}
                                        isInvalid={!!errors.nomeCadastro}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.nomeCadastro}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col lg='3'>
                                    <Form.Group className="mb-3" controlId="cpfCadastro">
                                        <Form.Label>CPF:</Form.Label>
                                        <InputMask
                                            mask="999.999.999-99"
                                            value={cpfCadastro}
                                            onChange={handleCpfChange}
                                        >
                                            {() => <Form.Control type="text" placeholder="CPF" required isInvalid={!!errors.cpfCadastro} />}
                                        </InputMask>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.cpfCadastro}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col lg='3'>
                                    <Form.Group className="mb-3" controlId="contatoCadastro">
                                        <Form.Label>Contato:</Form.Label>
                                        <InputMask
                                            mask="(99) 99999-9999"
                                            value={contatoCadastro}
                                            onChange={handleContatoChange}
                                        >
                                            {() => <Form.Control type="text" placeholder="Contato" required isInvalid={!!errors.contatoCadastro} />}
                                        </InputMask>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.contatoCadastro}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col lg='4'>
                                    <Form.Group className="mb-3" controlId="enderecoCadastro">
                                        <Form.Label>Endereço:</Form.Label>
                                        <Form.Control type="text" placeholder="Endereço"
                                        required
                                        value={enderecoCadastro}
                                        onChange={handleEnderecoChange}
                                        isInvalid={!!errors.enderecoCadastro}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col lg='1'>
                                    <Form.Group className="mb-3" controlId="numeroCadastro">
                                        <Form.Label>Número:</Form.Label>
                                        <Form.Control type="text" placeholder="Número" style={{width: '85px'}}
                                        required
                                        value={numeroCadastro}
                                        onChange={handleNumeroChange}
                                        isInvalid={!!errors.numeroCadastro}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col lg='3'>
                                    <Form.Group className="mb-3" controlId="bairroCadastro">
                                        <Form.Label>Bairro:</Form.Label>
                                        <Form.Control type="text" placeholder="Bairro"
                                        required
                                        value={bairroCadastro}
                                        onChange={handleBairroChange}
                                        isInvalid={!!errors.bairroCadastro}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col lg='3'>
                                    <Form.Group className="mb-3" controlId="cidadeCadastro">
                                        <Form.Label>Cidade:</Form.Label>
                                        <Form.Control type="text" placeholder="Cidade"
                                        required
                                        value={cidadeCadastro}
                                        onChange={handleCidadeChange}
                                        isInvalid={!!errors.cidadeCadastro}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg='5'>
                                    <div id="barra"></div>
                                </Col>
                            </Row>

                            <h5>Detalhes do Serviço</h5>

                            <Row className="espaco">
                                <Col lg='4'>
                                    <Form.Label>Tipo de Serviços</Form.Label>
                                    <Form.Select aria-label="Default select example" required value={tipoServico} onChange={handleTipoServicoChange}>
                                        <option>Selecione</option>
                                        <option value="1">Erradicação de Árvore</option>
                                        <option value="2">Poda de Árvore</option>
                                        <option value="3">Doação de Mudas</option>
                                    </Form.Select>
                                </Col>

                                <Col lg='2'>
                                    <Form.Group className="mb-3" controlId="dataCadastro">
                                        <Form.Label>Data</Form.Label>
                                        <Form.Control type="date"
                                        required
                                        value={dataCadastro}
                                        onChange={handleDataChange}
                                        isInvalid={!!errors.dataCadastro}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.dataCadastro}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                <Col lg='2'>
                                    <Form.Group className="mb-3" controlId="horarioServico">
                                        <Form.Label>Horário</Form.Label>
                                        <Form.Control type="time"
                                        required
                                        value={horarioServico}
                                        onChange={handleHorarioChange}
                                        isInvalid={!!errors.horarioServico}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="espaco">
                                <Col lg='2' className="mb-3" id="divisao">
                                    <Form.Label>Referências Especiais</Form.Label>
                                    <FloatingLabel
                                        controlId="referenciaServico"
                                        label="Observações"
                                        className="mb-3">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Leave a comment here"
                                            style={{
                                                width: '500px',
                                                height: '200px'}} required value={referenciaServico} onChange={handleReferenciaChange}/>
                                    </FloatingLabel>
                                </Col> 
                                
                                <Col lg='2'>
                                    <Form.Label>Descrição do Serviço</Form.Label>
                                        <FloatingLabel
                                        controlId="descricaoServico"
                                        label="Observações"
                                        className="mb-3">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Leave a comment here"
                                            style={{
                                                width: '500px',
                                                height: '200px'}} required value={descricaoServico} onChange={handleDescricaoChange}/>
                                    </FloatingLabel>
                                </Col>
                            </Row>
                                
                            <Row className="espaco" id="flex" style={{display: 'flex', justifyContent: 'center'}}>
                                <Form.Check >
                                    <Form.Check.Input type="checkbox" id="checkbox"/>
                                    <Form.Check.Label id="label">
                                        Aceito os <a href="#">Termos e Condições</a>
                                    </Form.Check.Label>
                                </Form.Check>

                                <Alert variant="success" id="alerta" show={showMensagem}><FaCheckCircle /> Agendamento Realizado com Sucesso!</Alert>
                            </Row>

                            <Button variant="success" type="submit" className="mt-3" id="botao">
                                Agendar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default AgendarServicos;