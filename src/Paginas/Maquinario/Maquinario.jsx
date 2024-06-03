import { Button, Col, Form, Row, Container, Table, Alert } from 'react-bootstrap';
import { FaCheckCircle, FaTrashAlt, FaListAlt } from 'react-icons/fa'
import { useEffect, useState } from 'react';

function Maquinario() {
    const [showMensagem, setshowMensagem] = useState(false)
    const [validated, setValidated] = useState(false);
    const [modelo, setModelo] = useState("");
    const [placa, setPlaca] = useState("");
    const [ano, setAno] = useState("");

    const [errors, setErrors] = useState({});
    const [showAlertExcluir, setShowAlertExcluir] = useState(false);
    const [listaMaquinario, setListaMaquinario] = useState([]);

    useEffect(() => {
        const listaSalva = localStorage.getItem('maquinario');
        if (listaSalva != null) {
            setListaMaquinario(JSON.parse(listaSalva))
        }
    }, []);

    const handleExcluir = (id) => {
        setShowAlertExcluir(true); // Exibir a mensagem de aviso
      
        setTimeout(() => {
          const novoMaquinario = listaMaquinario.filter((maquinario) => maquinario.id !== id);
          setListaMaquinario(novoMaquinario);
          localStorage.setItem('maquinario', JSON.stringify(novoMaquinario));
          setShowAlertExcluir(false); // Ocultar a mensagem de aviso após a exclusão
        }, 2000); // Aguardar 2 segundos antes de excluir o cadastro
      };

    

    const handleModelo= (e) => {
        const value = e.target.value;
        setModelo(value);
        if (value && value.length <= 50) {
            setErrors((prev) => ({ ...prev, modelo: null }));
        } else {

            if (value === "") {
                setErrors((prev) => ({ ...prev, modelo: 'O campo não pode estar vazio.' }));
            } else {
                setErrors((prev) => ({ ...prev, modelo: 'O campo não aceita mais de 50 caracteres.' }));
            }
        }
    };
    const handlePlaca = (e) => {
        const value = e.target.value;
        setPlaca(value);
        if (value && value.length <= 50) {
          setErrors((prev) => ({ ...prev, placa: null }));
        } else {
          if (value === "") {
            setErrors((prev) => ({ ...prev, placa: 'O campo não pode estar vazio.' }));
          } else {
            setErrors((prev) => ({ ...prev, placa: 'O campo não aceita mais de 50 caracteres.' }));
          }
        }
      };
    const handleAno= (e) => {
        const value = e.target.value;
        setAno(value);
        if (value && value.length <= 50) {
            setErrors((prev) => ({ ...prev, ano: null }));
        } else {

            if (value === "") {
                setErrors((prev) => ({ ...prev, ano: 'O campo não pode estar vazio.' }));
            } else {
                setErrors((prev) => ({ ...prev, ano: 'O campo não aceita mais de 50 caracteres.' }));
            }
        }
    };

    function handleSalvar(event) {
        event.preventDefault();
        const form = event.currentTarget;
        let newErros = {};

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        }
        if (!modelo) {
            newErros.modelo = 'O campo não pode estar vazio.'
        } else if (modelo.length > 50) {
            newErros.modelo = 'O campo não aceita mais de 50 caracteres.'
        }

        if (!placa) {
            newErros.placa = 'O campo não pode estar vazio.'
        } else if (placa.length > 50) {
            newErros.placa = 'O campo não aceita mais de 50 caracteres.'
        }

        if (!ano) {
            newErros.ano = 'O campo não pode estar vazio.'
        } else if (ano.length > 50) {
            newErros.ano = 'O campo não aceita mais de 50 caracteres.'
        }

        if (Object.keys(newErros).length > 0) {
            setErrors(newErros);
          } else {
            const listaSalva = localStorage.getItem('maquinario');
            const maquinario = listaSalva ? JSON.parse(listaSalva) : [];
            const novoId = maquinario.length + 1; // Gere um novo ID
        
            const novoMaquinario = {
              id: novoId, // Atribua o novo ID
              modelo: form.modelo.value,
              placa: form.placa.value,
              ano: form.ano.value,
            };
        
            maquinario.push(novoMaquinario);
            localStorage.setItem('maquinario', JSON.stringify(maquinario));
        
            setshowMensagem(true);
          }
          setValidated(true);
        }
    return (
<>
        <Container className='form-colab'>
            <h2 className="text-center mb-4"><FaListAlt /> CADASTRO DE MAQUINÁRIO</h2>
            <Col class="card borda">
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
                                <Form.Group controlId='modelo'>
                                    <Form.Label>Modelo</Form.Label>
                                    <Col class="input-group mb-3">
                                        <Form.Control type="text" class="form-control" placeholder="Modelo do Maquinario" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                            required
                                            value={modelo}
                                            isInvalid={!!errors.modelo}
                                            onChange={handleModelo}
                                            name="modelo"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.modelo}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col lg='3' className='mt-3'>
                                <Form.Group controlId='placa'>
                                    <Form.Label>Placa</Form.Label>
                                    <Col className="input-group mb-3">
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            placeholder="Placa do Maquinário"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            required
                                            value={placa}
                                            isInvalid={!!errors.placa}
                                            onChange={handlePlaca}
                                            name='placa'
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.placa}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>


                            <Col lg='3' className='mt-3'>
                                <Form.Group controlId='ano'>
                                    <Form.Label>Ano do Maquinário</Form.Label>
                                    <Col className="input-group mb-3">
                                        <Form.Control
                                            type="text"
                                            className="form-control"
                                            placeholder="Ano do Maquinário"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            required
                                            value={ano}
                                            isInvalid={!!errors.ano}
                                            onChange={handleAno}
                                            name='ano'
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.ano}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Alert className="alert-success-custom" variant='sucess' show={showMensagem}> <b> <FaCheckCircle></FaCheckCircle> </b>Maquinário Cadastrado com Sucesso!</Alert>
                        <Container className="custom-table-container mx-0">
                                <Alert variant="danger" show={showAlertExcluir}>
                                    Cadastro excluído com sucesso!
                                </Alert>
                                    <Table striped bordered hover className="table mt-5 custom-table">
                                        {/* ... */}
                                    </Table>
                        </Container>
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
                            <th scope="col" className="w-15">modelo</th>
                            <th scope="col" className="w-15">placa</th>
                            <th scope="col" className="w-20">ano</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaMaquinario.length <= 0 ? (
                            <tr>
                                <td colSpan="13">Nenhum maquinario cadastrado</td>
                            </tr>
                        ) : (
                            listaMaquinario.map((maquinario, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'dark-green' : 'light-green'}>
                                    <td>{maquinario.id}</td>
                                    <td>{maquinario.modelo}</td>
                                    <td>{maquinario.placa}</td>
                                    <td>{maquinario.ano}</td>
                                    <td>
                                        <Button className='btn btn-danger btn-sm' onClick={() => handleExcluir(maquinario.id)} > <FaTrashAlt></FaTrashAlt>Excluir</Button>
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
export default Maquinario;