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


export const userList = (token, pageIndex, pageSize) => {
    return axios.get(`${API}/Admin/getuser?PageNumber=${pageIndex}&PageSize=10`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}

export const userAccess = (data) => {
    return axios.post(`${API}/Admin/setUserAccess`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const getChats = (email) => {
    let data = {
        "email": email
      }
    return axios.post(`${API}/Admin/getChats`, data,{
        headers: {
            'Content-Type': 'application/json'
        }
    })
}