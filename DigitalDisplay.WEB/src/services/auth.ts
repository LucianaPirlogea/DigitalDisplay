import API, { defaultHeaders } from '../api';
import { LoginUser, RegisterUser } from '../models/user';

export async function registerUser(user: RegisterUser) {
    const res = await API.post<string>('User/Register', user, {
        redirectWhenUnauthorized: false,
        headers: defaultHeaders,
    });
    return res;
}

export async function loginUser(user: LoginUser) {
    const res = await API.post<any>('User/Login', user, {
        redirectWhenUnauthorized: false,
        headers: defaultHeaders,
    });
}