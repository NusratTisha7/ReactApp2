import { useState,useEffect } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { login } from '../../Api/Api'
import { authenticate,isAuthenticated } from '../../utils/auth';
import Message from '../../utils/alert'
import {Redirect} from 'react-router-dom';

const Login = () => {

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "30px auto" }
    const avatarStyle = { backgroundColor: "#527a7a" }
    const btnStyle = { margin: '20px 0', backgroundColor: "#527a7a" }
    const txtFieldstyle = { marginTop: '10px' }

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
        success: false,
        msg: ''
    });

    const { email, password,success,msg } = loginForm;

    const handleChange = e => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = e => {
        e.preventDefault();
        login({ email, password })
            .then(response => {
                authenticate(response.data.token, (success,msg) => {
                    setLoginForm({
                        email: '',
                        password: '',
                        success: success,
                        msg:msg
                    })
                })
            }).catch(e=>{
                setLoginForm({
                    email: '',
                    password: '',
                    success: false,
                    msg:'Invalid Credentials'
                })
            })
    }

    
    const signInForm = () => (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Login</h2>
                </Grid>

                <TextField label='username' name="email" value={email} placeholder='Enter username' fullWidth required onChange={handleChange} />
                <TextField label='Password' name="password" value={password} placeholder='Enter password' type='password' fullWidth required style={txtFieldstyle} onChange={handleChange} />
                <Button type='submit' variant='contained' fullWidth style={btnStyle} onClick={handleSubmit}>Login</Button>
            </Paper>
        </Grid>
    )

   
    const Alert = (success,msg) => {
        if(msg!==''){
            return(
                <Message success={success} msg={msg}/>
            )
        }
    }

    return (
        <div>
            {isAuthenticated() ? <Redirect to="/admin"/> : ""}
            {Alert(success,msg)}
            {signInForm()}
        </div>
    )
}
export default Login;
