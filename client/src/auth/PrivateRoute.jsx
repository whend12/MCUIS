import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, login }) => {
  return login ? element : <Navigate to="/" />;
};

export default PrivateRoute;
