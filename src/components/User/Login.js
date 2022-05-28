import { useState,useEffect  } from 'react';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { login } from '../../Api/Api'
import { authenticate, isAuthenticated } from '../../utils/auth';
import { Message } from '../../utils/alert'
import { Redirect } from 'react-router-dom';
import Loader from '../Loading/loadingModal'

const Login = () => {

    let [open,setOpen]=useState(false)
    const paperStyle = { padding: 20, height: '60vh', width: 300, margin: "100px auto" }
    const avatarStyle = { backgroundColor: "#527a7a" }
    const btnStyle = { margin: '30px 0', backgroundColor: "#527a7a", color: 'white' }
    const txtFieldstyle = { marginTop: '10px' }

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
        success: false,
        msg: ''
    });

    const { email, password } = loginForm;

    const handleChange = e => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        if (email === '' || password === '') {
            Message(true, 'Please fill in all the required fields')
        }
        else {
            setOpen(true)
            e.preventDefault();
            login({ email, password })
                .then(response => {
                    setOpen(false)
                    authenticate(response.data.token, (success, msg) => {
                        setLoginForm({
                            email: '',
                            password: ''
                        })
                        Message(true, msg)
                    })
                }).catch(e => {
                    setOpen(false)
                    setLoginForm({
                        email: '',
                        password: ''
                    })
                    Message(false, 'Invalid Credentials')
                })
        }
    }


    const signInForm = () => (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center' className='mt-3'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h1 class="text-xl md:text-2xl font-bold leading-tight mt-2">Log In</h1>
                </Grid>

                <TextField label='Email' name="email" value={email} fullWidth required onChange={handleChange} />
                <TextField label='Password' name="password" value={password} type='password' fullWidth required style={txtFieldstyle} onChange={handleChange} />
                <Button type='submit' variant='contained' fullWidth style={btnStyle} onClick={handleSubmit}>Login</Button>
            </Paper>
        </Grid>
    )

    return (
        <div>
            <Loader open={open}/>
            {isAuthenticated() ? <Redirect to="/admin" /> : ""}
            {signInForm()}
        </div>
    )
}
export default Login;
