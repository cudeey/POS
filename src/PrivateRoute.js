import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ path, element }) => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Route path={path} element={element} />;
};

export default PrivateRoute;
