import { useEffect, useState } from "react";
import { Container, Col, Form, Row, Spinner } from "react-bootstrap";

export default function CaixaSelecao({ enderecoFonteDados, campoChave, campoExibicao, funcaoSelecao }) {
    const [valorSelecionado, setValorSelecionado] = useState('');
    const [carregandoDados, setCarregandoDados] = useState(false);
    const [dados, setDados] = useState([]);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                setCarregandoDados(true);
                const resposta = await fetch(enderecoFonteDados);

                if (resposta.ok) {
                    const listaDados = await resposta.json();
                    console.log("Dados recebidos da API:", listaDados);

                    // Coloca o objeto em um array
                    const dadosObtidos = Array.isArray(listaDados) ? listaDados : [listaDados];

                    setDados(dadosObtidos);
                    if (dadosObtidos.length > 0) {
                        const primeiroItem = dadosObtidos[0];
                        setValorSelecionado(primeiroItem[campoChave]);
                        funcaoSelecao(primeiroItem);
                    }
                } else {
                    console.error("Erro na resposta:", resposta.statusText);
                    setDados([]);
                }
            } catch (erro) {
                console.error("Erro ao carregar dados:", erro);
                setDados([]);
            } finally {
                setCarregandoDados(false);
            }
        };

        carregarDados();
    }, [enderecoFonteDados]);

    return (
        <Container border>
            <Row>
                <Col md={11}>
                    <Form.Select
                        value={valorSelecionado}
                        onChange={(evento) => {
                            const itemSelecionado = evento.currentTarget.value;
                            const pos = dados.map((item) => item[campoChave].toString()).indexOf(itemSelecionado);
                            const selecionado = dados[pos];

                            // Verifica se selecionado é válido
                            if (selecionado) {
                                setValorSelecionado(itemSelecionado);
                                funcaoSelecao(selecionado);
                            }
                        }}>
                        <option value="" disabled>Selecione uma opção</option>
                        {
                            dados.length > 0 ? (
                                dados.map((item) => (
                                    <option key={item[campoChave]} value={item[campoChave]}>
                                        {item[campoExibicao]}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>Nenhuma opção disponível</option>
                            )
                        }
                    </Form.Select>
                </Col>
                <Col md={1}>
                    <Spinner className={carregandoDados ? "visible" : "invisible"} />
                </Col>
            </Row>
        </Container>
    );
}
