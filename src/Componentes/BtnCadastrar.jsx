import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus, FaSave} from 'react-icons/fa';

const BtnCadastrar = ({ editandoAtividade, handleCadastrar }) => {
    return (
        <>
            <Button className='btn w-100' variant='primary' onClick={handleCadastrar}>
                {editandoAtividade ? <><FaSave /> Salvar</> : <><FaPlus /> Cadastrar</>}
            </Button>
        </>
    );
};

export default BtnCadastrar;
