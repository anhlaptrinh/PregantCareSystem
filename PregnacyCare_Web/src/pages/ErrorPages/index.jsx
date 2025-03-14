import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page not found</h1>
      <p>The page you requested does not exist or has been deleted.</p>
      <Link
        to="/"
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          display: "inline-block",
          marginTop: "20px",
        }}
      >
        Back Home.
      </Link>
    </div>
  );
};

export default ErrorPage;
