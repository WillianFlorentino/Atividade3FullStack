import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus, FaSave} from 'react-icons/fa';

const BtnCadastrar = ({ editandoAtividade, handleSalvar }) => {
    return (
        <>
            <Button type='submit' className='btn w-100' variant='success' onClick={handleSalvar}>
                {editandoAtividade ? <><FaSave /> Salvar</> : <><FaPlus /> Cadastrar</>}
            </Button>
        </>
    );
};

export default BtnCadastrar;
