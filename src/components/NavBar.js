import React, { useMemo } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function NavBar({ currentNav, setCurrentNav }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link
        className={`nav-link ${currentNav === "create" ? "current-nav" : ""}`}
        to="/create"
        onClick={(e) => {
          setCurrentNav("create");
          navigate("/create");
        }}
      >
        Create
      </Link>
      <Link
        className={`nav-link ${currentNav === "existing" ? "current-nav" : ""}`}
        to="/"
        onClick={(e) => {
          setCurrentNav("existing");
          navigate("/");
        }}
      >
        Existing
      </Link>
    </nav>
  );
}
