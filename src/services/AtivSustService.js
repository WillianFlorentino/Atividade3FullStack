const API_BASE_URL = "http://localhost:3001";

class AtivSustService {
       async obterTodos() {
        const response = await fetch(`${API_BASE_URL}/criarativsust`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log('Erro ao obter todas as atividades');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async obterTipos() {
        try {
            const response = await fetch(`${API_BASE_URL}/criarativsust`, { // Endpoint para obter tipos de atividades
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.log('Erro ao obter tipos de atividades.');
                throw new Error('Erro ao obter tipos de atividades.');
            }

            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error('Erro ao obter tipos de atividades:', error);
            throw error;
        }
    }

    async adicionar(atividadeDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/criarativsust`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(atividadeDados) // Certifique-se de que atividadeDados tem o formato correto
            });
    
            if (!response.ok) {
                const errorData = await response.json(); // Captura a resposta de erro do backend
                console.log('Erro ao adicionar:', errorData);
                throw new Error(`Erro ao adicionar atividade: ${errorData.message}`);
            }
    
            const dados = await response.json(); // Supondo que o backend retorna os dados da atividade criada
            return dados; // Retorna os dados para uso posterior
        } catch (error) {
            console.error('Erro ao adicionar atividade:', error);
            throw error; // Lança o erro para o frontend lidar com ele
        }
    }
    

    async atualizar(idAtividade, atividadeDados) {

        try {
            const response = await fetch(`${API_BASE_URL}/criarativsust/${idAtividade}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(atividadeDados)
            })
    
            if (!response.ok) {
                console.log('Erro ao atualizar!')
                throw new Error('Erro ao atualizar atividade...')
            }
        } catch (error) {
            throw error;
        }
    }

    async obterPorId(tipo_id) {
        const response = await fetch(`${API_BASE_URL}/criarativsust/${tipo_id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            console.log('Ocorreu um erro ao editar a atividade');
        }else{
            const dados = await response.json();
            return dados;
        }
    }

    async excluir(idAtividade) {

        try {
            const response = await fetch(`${API_BASE_URL}/criarativsust/${idAtividade}`, {
                method: 'DELETE'
            })
    
            if (!response.ok) {
                console.log('Erro ao excluir!')
                throw new Error('Erro ao excluir atividade...')
            }
        } catch (error) {
            throw error;
        }
    }

    async filtrar(termoBusca) {
        const response = await fetch(`${API_BASE_URL}/criarativsust/filtrar/${termoBusca}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            console.log('Ocorreu um erro ao editar a atividade');
        }else{
            const dados = await response.json();
            return dados;
        }
    }
    

}

export default AtivSustService;