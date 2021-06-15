import React, { Component } from "react";
import PageHeader from "./common/page_header";

class Home extends Component {

  state = {};

  render() {

    return (
      <div className="container">
        <PageHeader title_text="Home Page" />
        <div className="row">
          <div className="col-12">
            <p>This is Poster web application. It is SPA based.</p>
          </div>
        </div>
      </div>
    );
    
  }
}

export default Home;