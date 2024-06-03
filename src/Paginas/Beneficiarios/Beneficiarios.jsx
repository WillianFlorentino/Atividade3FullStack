import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Table, Form, Button, InputGroup, } from "react-bootstrap";
import { FaListAlt, FaEdit, FaSearch, FaBackspace, FaTrashAlt, FaList, } from "react-icons/fa";
import BeneficiariosForm from "./BeneficiariosForm";
import BeneficiarioService from "../../services/BeneficiarioService";

const beneficiarioService = new BeneficiarioService();

function Beneficiarios() {
  const [listaBeneficiarios, setListaBeneficiarios] = useState([]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [mostrarTabela, setMostrarTabela] = useState(false);

  const handleFillForm = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
  };

  const listarBeneficiarios = async (termoBusca) => {
    let dados = [];
    if (termoBusca) {
      dados = await beneficiarioService.filtrarBeneficiarios(termoBusca);
    } else {
      dados = await beneficiarioService.obterTodosBeneficiarios();
    }
    setListaBeneficiarios(dados);
  };

  const handleFiltrar = async () => {
    await listarBeneficiarios(searchName);
    setMostrarTabela(true);
  };

  const handleListarTodos = async () => {
    await listarBeneficiarios();
    setSearchName("");
    setMostrarTabela(true);
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      await beneficiarioService.deletarBeneficiario(id);
      await listarBeneficiarios();
    }
  };

  useEffect(() => {
    listarBeneficiarios();
  }, []);

  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const filteredBeneficiaries = listaBeneficiarios.filter((beneficiary) =>
    beneficiary.nome.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <>
      <h2 className="text-center">
        <FaListAlt /> CADASTRO DE BENEFICIÁRIOS
      </h2>
      <Container>
        <Card>
          <Card.Header as="h4">Informações Pessoais:</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <BeneficiariosForm
                  selectedBeneficiary={selectedBeneficiary}
                  onFormSubmit={listarBeneficiarios}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <hr />
      <h3 className="text-center mt-4">Beneficiários Cadastrados</h3>
      
      <Container className="mt-3">
        <Form className="d-flex justify-content-center mb-3">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Pesquisar por nome"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={handleFiltrar} disabled>
  <FaSearch style={{ color: "#666666" }} />
</Button>

            <Button variant="secondary" onClick={() => setSearchName("")}>
              <FaBackspace /> Limpar
            </Button>
            <Button variant="secondary" onClick={handleListarTodos}>
              <FaList /> ListarTodos
            </Button>
          </InputGroup>
        </Form>
        {mostrarTabela && (
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Contato</th>
                <th>E-mail</th>
                <th>Endereço</th>
                <th>Bairro</th>
                <th className="text-center">Número</th>
                <th className="text-center">Data de Nascimento</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredBeneficiaries.map((beneficiary, index) => (
                <tr key={index}>
                  <td>{beneficiary.id}</td>
                  <td>{beneficiary.nome}</td>
                  <td>{beneficiary.cpf}</td>
                  <td>{beneficiary.contato}</td>
                  <td>{beneficiary.email}</td>
                  <td>{beneficiary.endereco}</td>
                  <td>{beneficiary.bairro}</td>
                  <td className="text-center">{beneficiary.numero}</td>
                  <td className="text-center">
                    {formattedDate(beneficiary.datanascimento)}
                  </td>
                  <td className="text-center">
                    <FaEdit
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => handleFillForm(beneficiary)}
                    />
                    <FaTrashAlt
                      style={{
                        cursor: "pointer",
                        color: "red",
                        marginLeft: "10px",
                      }}
                      onClick={() => handleExcluir(beneficiary.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}

export default Beneficiarios;
