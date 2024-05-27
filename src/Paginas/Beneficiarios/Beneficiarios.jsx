import { useState } from "react";
import { Container, Card, Row, Col, Table, Button } from "react-bootstrap";
import { FaListAlt } from "react-icons/fa";
import BeneficiariosForm from './BeneficiariosForm';

function Beneficiarios() {
  const prefilledBeneficiaries = [
    {
      id: "123456",
      nome: "Ana Clara",
      cpf: "123.456.789-00",
      contato: "(11) 91234-5678",
      endereco: "Rua A, 123",
      bairro: "Centro",
      numero: "123",
      dataNascimento: "01/01/1990",
    },
    {
      id: "654321",
      nome: "João Paulo",
      cpf: "987.654.321-00",
      contato: "(11) 99876-5432",
      endereco: "Rua B, 456",
      bairro: "Bela Vista",
      numero: "456",
      dataNascimento: "02/02/1985",
    },
    {
      id: "234567",
      nome: "Taisa Mariana",
      cpf: "234.567.890-12",
      contato: "(21) 92345-6789",
      endereco: "Avenida C, 789",
      bairro: "Jardins",
      numero: "789",
      dataNascimento: "03/03/1978",
    },
    {
      id: "345678",
      nome: "Neide Fátima",
      cpf: "345.678.901-23",
      contato: "(31) 93456-7890",
      endereco: "Rua D, 321",
      bairro: "Vila Nova",
      numero: "321",
      dataNascimento: "04/04/1992",
    },
    {
      id: "456789",
      nome: "Paulo Sergio",
      cpf: "456.789.012-34",
      contato: "(41) 94567-8901",
      endereco: "Avenida E, 654",
      bairro: "Santa Maria",
      numero: "654",
      dataNascimento: "05/05/1980",
    },
    {
      id: "567890",
      nome: "Helloisa Vitória",
      cpf: "567.890.123-45",
      contato: "(51) 95678-9012",
      endereco: "Rua F, 987",
      bairro: "Boa Vista",
      numero: "987",
      dataNascimento: "06/06/1983",
    },
    {
      id: "678901",
      nome: "Hellena Ferreira",
      cpf: "678.901.234-56",
      contato: "(61) 96789-0123",
      endereco: "Avenida G, 210",
      bairro: "Centro",
      numero: "210",
      dataNascimento: "07/07/1995",
    },
  ];

  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);

  const handleFillForm = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
  };

  return (
    <>
      <h2 className="text-center mt-4">
        <FaListAlt /> Gerenciar Beneficiários
      </h2>
      <Container>
        <Card>
          <Card.Header>Cadastro Beneficiários</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <BeneficiariosForm selectedBeneficiary={selectedBeneficiary} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <hr />
      <h3 className="text-center">Beneficiários Cadastrados</h3>
      <Container>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Contato</th>
              <th>Endereço</th>
              <th>Bairro</th>
              <th>Número</th>
              <th>Data de Nascimento</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {prefilledBeneficiaries.map((beneficiary, index) => (
              <tr key={index}>
                <td>{beneficiary.id}</td>
                <td>{beneficiary.nome}</td>
                <td>{beneficiary.cpf}</td>
                <td>{beneficiary.contato}</td>
                <td>{beneficiary.endereco}</td>
                <td>{beneficiary.bairro}</td>
                <td>{beneficiary.numero}</td>
                <td>{beneficiary.dataNascimento}</td>
                <td>
                 
                <Button
                    variant="info"
                    onClick={() => handleFillForm(beneficiary)}
                  >
                    <i className="bi bi-arrow-up-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Beneficiarios;
