import http from './http_service';
import { api_url } from "../config.json";
import jwt_decode from 'jwt-decode';

const jwt_str = "token";

export function get_token() {
    return localStorage.getItem(jwt_str);
}

export function log_out() {
    localStorage.removeItem(jwt_str);
}

//Function gets a jwt and decodes it into initial object which represents user
export function get_current_user() {
    try {
        const jwt = localStorage.getItem(jwt_str);
        return jwt_decode(jwt);
    }
    catch (err) {
        return null;
    }
}

//Logs in and sets jwt in local storage
export async function log_in(email, password) {
    const {data} = await http.post(`${api_url}/auth`, { email, password });

    localStorage.setItem("token", data.token);
}


export default {
    log_in,
    get_current_user,
    log_out,
    get_token,
};