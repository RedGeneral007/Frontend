import { Component } from 'react';
import user_service from '../services/user_service';


class SignOut extends Component {
    state = {};

    componentDidMount() {
        //Removing jwt token from local storage
        user_service.log_out();
        window.location = "/";
    }

    render() {
        return null;
    };

}

export default SignOut;