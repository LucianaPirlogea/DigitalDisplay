import { useNavigate } from 'react-router';
import API, { defaultHeaders } from '../api';
import { LoginUser, RegisterUser } from '../models/user';

export async function registerUser(user: RegisterUser) {
    const res = await API.post<string>('User/Register', user, {
        redirectWhenUnauthorized: false,
        headers: defaultHeaders,
    });
    return res;
}

export async function loginUser(userData: LoginUser) {
    return new Promise((resolve, reject) => {
        fetch('https://localhost:7188/User/Login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(responseJson => {
                localStorage.setItem('token', responseJson);
                resolve(responseJson);
            })
            .catch(error => {
                reject(error);
            });
    });
}