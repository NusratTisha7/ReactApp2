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

export const getChats = (email, token) => {
    let data = {
        "email": email
      }
    return axios.post(`${API}/Admin/getChats`, data,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}

export const chatList = (id,mail) => {
    const token = JSON.parse(localStorage.getItem('jwt'))
    return axios.get(`${API}/Admin/chatfromroom?roomID=${id}&email=${mail}`,{
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}