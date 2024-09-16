import { isSchool } from "pages/authentication/util";
import React from "react";
import { Navigate, Outlet } from "react-router";

function ProtectedSchool() {
  if (isSchool()) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default ProtectedSchool;
