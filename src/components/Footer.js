import React from "react";
import { Link } from "react-router-dom";
import eslLogo from "../assets/180x80px.png";

export default function Footer({ isEnterprise }) {
  // window.location
  return (
    <div className="footer">
      <a
        href="https://www.eswlab.com/"
        className="logo"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="esl-logo-img" src={eslLogo} alt="logo" />
      </a>
      <span className="contact-us-p">
        Contact us:{" "}
        <a href="mailto:appsupport@eswlab.com">appsupport@eswlab.com</a>
      </span>
    </div>
  );
}
