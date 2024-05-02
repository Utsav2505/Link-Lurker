import React from "react";
import "@styles/Tool.css";
const Report = ({ url }) => {
  return (
    <div className="report-bkgrnd">
      <div className="report-container">
        <h1>Report</h1>
        <h3>URL : {url}</h3>
      </div>
    </div>
  );
};

export default Report;
