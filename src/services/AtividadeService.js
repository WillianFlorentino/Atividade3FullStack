const API_BASE_URL = "http://localhost:3001";

class AtividadeService {
    async obterTodos() {
        const response = await fetch(`${API_BASE_URL}/atividade`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            console.log('Erro ao obter todas as atividades');
        }else{
            const dados = await response.json();
            return dados;
        }
    }
}

export default AtividadeService;