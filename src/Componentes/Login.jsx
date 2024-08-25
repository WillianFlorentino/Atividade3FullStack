import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function Login(){

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const response = await fetch('http://localhost:3001/api/auth/login',{
            method: 'POST', headers: {'Content-Type': 'application/json'}, 
            body:JSON.stringify({email: username, password})
        })

        const data = await response.json();

        if(response.ok){            
            localStorage.setItem('token', data.token);
            navigate('/Componentes');
        }else{
            alert(data.message);
        }


    }


    return (<form onSubmit={handleSubmit} >
        <h2>Login</h2>
        <div>
            <input type='text' placeholder='Nome' value={username} onChange={(e) => setUserName(e.target.value)}/>
        </div>
        <div>
            <input type='text' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
            <button type='submit'>Logar</button>
        </div>
        
    </form>)
}

export default Login;