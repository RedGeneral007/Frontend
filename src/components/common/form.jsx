import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";

class Form extends Component {

  // Validates the data object in state for an errors with Joi extension.
  validate_state_data = () => {
    // Validation compared to schema which we provide in every class which extends Form
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    if (!error) {
      return null;
    }

    const errors = {};
    for (const item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  // Validates VALUE of input for an errors with a Joi extension.
  // DOES NOT validates file input in this build
  validate_input = ({ name, value }) => {
    const obj = {
      [name]: value,
    };
    // Validation compared to schema which we provide in every class which extends Form
    const schema = {
      [name]: this.schema[name],
    };

    const { error } = Joi.validate(obj, schema);

    // Returns an error messages or null
    return error ? error.details[0].message : null;
  };

  // Function which taking final data validation and preventing from submitting if data invalid
  user_submit = (event) => {
    event.preventDefault();
    const errors = this.validate_state_data();
    this.setState({ errors: errors || {} });

    if (errors) {
      return;
    }

    // Submit if data valid with custom function called "submit_data" from class which extends Form 
    this.submit_data();
  };

  // Validates VALUE of input that we target for an errors with a Joi extension.
  // On every input change which is NOT type==="file"
  on_change = ({ currentTarget: input }) => {

    const errors = { ...this.state.errors };

    //Getting error message for our current input value
    const errorMessage = this.validate_input(input);

    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };


  on_file_change = async (event) => {
    if (event.target.files && event.target.files[0]) {

      // Getting all variables we need, data from state and file which user have chosen
      const data = { ...this.state.data };
      const image = event.target.files[0];

      //FileReader for image preview purposes
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          //Setting all state variables we need depending on file itself, file name and result from FileReader
          this.setState({
            data: {...data, image},
            image_name: image.name,
            reader_image_res: reader.result,
          });
        }
      }
      reader.readAsDataURL(image);

    }
  };

  // Submit button which disabled if any of inputs has invalid data
  render_button(label) {
    return (
      <button disabled={this.validate_state_data()} className="btn btn-primary shadow-sm position-relative fixed-bottom p-2 m-2">
        {label}
      </button>
    );
  }

  // Input render function which will return needed Input based on argument which we provide
  render_input(name, label, type = "text") {
    // Getting data and errors from state
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        label={label}
        // Different checks for strings and file
        onChange={type === "file" ? this.on_file_change : this.on_change}
        error={errors[name]}
        value={data[name]}
      />
    );
  }
}

export default Form;