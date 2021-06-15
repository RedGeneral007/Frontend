import React from "react";
import { toast } from "react-toastify";
import Joi from "joi-browser";

import { api_url } from '../config.json';
import PageHeader from "./common/page_header";
import Form from "./common/form";

import http from '../services/http_service';

class Signup extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
  };

  submit_data = async () => {
    const data = {...this.state.data};

    //If user provided correct and unique email which does not exists in database - signs him up and redirects to sign in page
    try {
      await http.post(`${api_url}/users`, data);

      toast(`User ${data.name} has been created.`);
      this.props.history.replace("/signin");
    }

    catch (e) {
      if (e.response && e.response.status === 400) {
        this.setState({errors: {email: "Email is taken"}})
      }
    }

  }

  render() {
    return (
      <div className="container">
        <PageHeader title_text="Sign up with Poster" />

        <div className="row">
          <div className="col-12">
            <p>You can open a new free account!</p>
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <form className="col-8 justify-content-center" onSubmit={this.user_submit} autoComplete="off">
            {this.render_input("email", "Email", "email")}
            {this.render_input("password", "Password", "password")}
            {this.render_input("name", "Name")}
            {this.render_button("Sign up")}
          </form>
        </div>
        
      </div>
    );
  }
}

export default Signup;