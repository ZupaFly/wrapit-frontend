/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AdminAuthContext } from "./AdminAuthContext";
import { AdminPageLogin } from "./AdminPageLogin";

export const AdminPageAuth = () => {
  const { autorized } = useContext(AdminAuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (autorized && location.pathname === "/admin") {
      navigate("/admin/adminmain", { replace: true });
    }
  }, [autorized, location.pathname, navigate]);

  if (!autorized) {
    return <AdminPageLogin />;
  }

  return <Outlet />;
};
