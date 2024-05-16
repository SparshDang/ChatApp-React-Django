import React, { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import authContext from "../context/AuthContext";

import style from "./BasePage.module.css";

export default function BasePage() {
  const context = useContext(authContext);
  const navigate = useNavigate();
  const logoutHandler = async (event) => {
    event.preventDefault();
    await context.logoutHandler();
    navigate("/auth");
  };

  return (
    <div>
      <header className={style.header}>
        <div className={style.leading}>
          <h1 className={style.heading}>Chat App</h1>
        </div>
        <div className={style.trailing}>
          {!context.userData.isAuthenticated ? (
            <Link to="/auth" className={style.action_btn}>
              Login
            </Link>
          ) : (
            <Link onClick={logoutHandler} className={style.action_btn}>
              Log Out
            </Link>
          )}
        </div>
      </header>
      <div id="error-banners"></div>
      <Outlet />
    </div>
  );
}
