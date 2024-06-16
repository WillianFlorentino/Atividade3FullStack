import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus, FaSave } from 'react-icons/fa';

const BtnCadastrar = ({ editandoAtividade, editandoServico, handleSalvar }) => {
    const [botaoAmarelo, setBotaoAmarelo] = useState(false);

    const handleClick = () => {
        if (typeof handleSalvar === 'function') {
            setBotaoAmarelo(true);
            handleSalvar();
            setTimeout(() => {
                setBotaoAmarelo(false);
            }, 300); // Volta para a cor verde depois de 300ms
        } else {
            console.error('handleSalvar is not a function');
        }
    };

    return (
        <>
            <Button
                type='submit'
                className='btn w-100'
                variant={botaoAmarelo ? 'warning' : (editandoAtividade || editandoServico) ? 'warning' : 'success'}
                onClick={handleClick}
            >
                {editandoAtividade || editandoServico ? <><FaSave /> Atualizar</> : <><FaPlus /> Cadastrar</>}
            </Button>
        </>
    );
};

export default BtnCadastrar;
