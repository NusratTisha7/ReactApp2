import LoginForm from '../components/User/Login';
import {useEffect} from 'react';

const Login = () => {
    useEffect(()=>{ 
        document.title='Login'; 
    },[])

    return (
            <LoginForm/>
    )
}
export default Login;