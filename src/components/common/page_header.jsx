import React from "react";

const PageHeader = ({ title_text }) => {
  return (
    <div className="row">
      <div className="col-12 mt-4">
        <h1>{title_text}</h1>
      </div>
    </div>
  );
};

export default PageHeader;