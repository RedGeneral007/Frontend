import axios from 'axios';
import { toast } from 'react-toastify';

const jwt_str = "token";

//Function which gets json web token from local storage
function getJwt() {
    return localStorage.getItem(jwt_str);
}

//Setting up the header variable for every server call
axios.defaults.headers.common["x-auth-token"] = getJwt();

axios.interceptors.response.use(null, (err) => {
    const expectedErr = err.response && err.response.status >= 403;

    if (expectedErr) {
        toast.error("An unexpected error occured.");
    }

    return Promise.reject(err);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete
}