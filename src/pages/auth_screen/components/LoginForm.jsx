import React, { useContext, useRef, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

import Loader from "../../../components/Loader";
import ErrorBanner from "../../../components/ErrorBanner";
import authContext from "../../../context/AuthContext";

import style from "./Form.module.css";

const errorReducer = (state, action) => {
  if (action.type === "RESET") {
    return {
      hasError: false,
      errors: null,
    };
  } else if (action.type === "ERROR") {
    return {
      hasError: true,
      errors: action.errors,
    };
  }
  return state;
};

export default function LoginForm() {
  const context = useContext(authContext);

  const [errorState, errorDispach] = useReducer(errorReducer, {
    hasError: false,
    errors: [],
  });
  const [isLoading, setIsLoading] = useState(false)

  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigator = useNavigate();

  const errorBannersDiv = document.getElementById("error-banners");

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    try {
      await context.loginHandler({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      navigator("/");
    } catch (e) {
      errorDispach({ type: "ERROR", errors: [e] });
      setTimeout(() => {
        errorDispach({ type: "RESET" });
      }, 5000);
    }
    setIsLoading(false);
  };
  return (
    <>
    {isLoading && <Loader/>}
    <form method="post" onSubmit={onLoginSubmit} className={style.form}>
      <label htmlFor="username">Username:</label>
      <input type="text" name="username" id="username" ref={usernameRef} />
      <label htmlFor="password">Password:</label>

      <input type="password" name="password" id="password" ref={passwordRef} />

      <input type="submit" value="Log in" className={style.action} />
      {errorState.hasError &&
        errorState.errors.map((error, i) => {
          return createPortal(
            <ErrorBanner message={error.message} />,
            errorBannersDiv
          );
        })}
    </form>
    </>
  );
}
