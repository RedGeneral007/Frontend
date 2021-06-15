import React from "react";

const Input = ({ name, label, error, ...rest }) => {

  //No need in changing input value for file
  if (rest.type === 'file') {
    delete rest.value;
  }
  
  //Different inputs depending on it's type
  switch(rest.type) {

    case "text": return (

      <div className="form-group d-flex flex-column">
        {name === 'name' && (<label htmlFor={name}>{label}</label>)}
        <input {...rest} name={name} id={name} placeholder={label} className="form-control" />
        {error && <span className="text-danger">{error}</span>}
      </div>
      
    );
    
    case "textarea": return (

      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <textarea {...rest} name={name} id={name} className="form-control" style={{height: "170px"}}/>
        {error && <span className="text-danger">{error}</span>}
      </div>

    );

    case "file": return (
        
          <label className="btn btn-primary position-relative fixed-top mb-1" htmlFor={name}>
            {label}
            <input {...rest} className="custom-file-input position-absolute" name={name} id={name} accept="image/jpg, image/png, image/jpeg" hidden/>
          </label>
        
        );
    
    //By default we will return a regular input with any other type but text, textarea or file
    default: return (

      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input {...rest} name={name} id={name} className="form-control" />
        {error && <span className="text-danger">{error}</span>}
      </div>
      
    );
  }
};

export default Input;