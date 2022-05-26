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
    return axios.post(`${API}/User/Registration`, user, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}


export const userList = (token,pageIndex,pageSize) => {
    
    return axios.get(`${API}/Admin/getuser?PageNumber=${pageIndex}&PageSize=${pageSize}`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}