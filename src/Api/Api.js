import axios from 'axios';
import { API } from '../utils/config';

export const login = (user) => {
    return axios.post(`${API}/User/Login`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const registration = (user, token) => {

    console.log("user",user)
    
    return axios.post(`${API}/User/Registration`, user, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}