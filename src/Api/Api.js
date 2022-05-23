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
    console.log("token", token)
    
    let json = {
        "email": "12w125555555523423432@gmail.com",
        "password": "string",
        "fullName": "string",
        "bDate": "2022-05-23",
        "address": {
            "address": "string",
            "lat": "string",
            "long": "string"
        },
        "ocacupation": "string",
        "mobile": "string",
        "photo": {
            "base64": "string",
            "type": "string"
        }
    }
    console.log("json", json)
    console.log("user", user)
    return axios.post(`${API}/User/Registration`, json, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
}