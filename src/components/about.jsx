import React, { Component } from "react";
import PageHeader from "./common/page_header";

class About extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <PageHeader title_text="About Poster" />
        <div className="row">
          <div className="col-12">
            <p>This is Poster app. You can express your opinion and share images with other people!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;