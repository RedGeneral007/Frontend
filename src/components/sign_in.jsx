import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import PageHeader from "./common/page_header";
import Form from "./common/form";

import user_service from '../services/user_service';



class Signin extends Form {
    state = {
      data: {
        email: "",
        password: "",
      },
      errors: {},
    };
  
    schema = {
      email: Joi.string().required().email().label("Email"),
      password: Joi.string().required().min(6).label("Password"),
    };
  
    //Function with that name runs after submitting the form from current page
    submit_data = async () => {
        const {email,password} = this.state.data;
  
        //If user provided correct email and password - signs him in and redirects to main page
        try {  
            await user_service.log_in(email,password);
            window.location = "/";
        }
        catch(err) {
            if(err.response && err.response.status === 400) {
                this.setState({errors: {email: err.response.data}});
            }
        }
    }
  
    render() {

      //If user logged in before - no reason for him to be on this page
      if (user_service.get_current_user()) {
        return <Redirect to = "/" />;
      }

      return (
        <div className="container">
          <PageHeader title_text="Sign in with Poster" />
          <div className="row">
            <div className="col-12">
              <p>Sign in to Poster!</p>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <form className="col-8" onSubmit={this.user_submit} autoComplete="off">
              {this.render_input("email", "Email", "email")}
              {this.render_input("password", "Password", "password")}
              {this.render_button("Sign in")}
            </form>
          </div>
        </div>
      );
    }
  }
  
  export default Signin;