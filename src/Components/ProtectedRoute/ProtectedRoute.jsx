import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../Context/User.context";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(userContext);

  if (token) {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
}
