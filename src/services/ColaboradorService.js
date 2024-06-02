const API_BASE_URL = 'http://localhost:3001'
class ColaboradorService {

    async obterTodos() {
        const response = await fetch(`${API_BASE_URL}/colaborador`, {

            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            console.log('ocorreu um erro ao listar')
        } else {

            const dados = await response.json();
            return dados;
        }
    }

    async obterPorId(id) {
        const response = await fetch(`${API_BASE_URL}/colaborador/${id}`, {

            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            console.log('ocorreu um erro ao listar')
        } else {

            const dados = await response.json();
            return dados;
        }
    }

    async adicionar(colaboradorDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/colaborador`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(colaboradorDados)

            })
            if (!response.ok) {
                console.log('ocorreu um erro ao adicionar')
                throw new Error('Erro ao Cadastrar Colaborador!')
            }
        } catch (error) {
            throw error;
        }
    }

    async atualizar(idColaborador, colaboradorDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/colaborador/${idColaborador}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(colaboradorDados)

            })
            if (!response.ok) {
                console.log('ocorreu um erro ao atualizar')
                throw new Error('Erro ao Atualizar Colaborador!')
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(idColaborador) {
        try {
            const response = await fetch(`${API_BASE_URL}/colaborador/${idColaborador}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                console.log('ocorreu um erro ao deletar')
                throw new Error('Erro ao Deletar um Colaborador!')
            }
        } catch (error) {
            throw error;
        }
    }

    async filtrar(termobusca) {
        const response = await fetch(`${API_BASE_URL}/colaborador/filtrar/${termobusca}`, {

            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            console.log('ocorreu um erro ao listar')
        } else {

            const dados = await response.json();
            return dados;
        }
    }

}

export default ColaboradorService