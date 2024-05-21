import React, { useContext, useRef, useReducer, useState } from "react";
import { createPortal } from "react-dom";

import ErrorBanner from "../../../components/ErrorBanner";
import Loader from "../../../components/Loader";

import style from "./Form.module.css";

import authContext from "../../../context/AuthContext";

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

export default function RegisterForm({ changeToLoginState }) {
  const context = useContext(authContext);
  const [errorState, errorDispach] = useReducer(errorReducer, {
    hasError: false,
    errors: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const usernameRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const errorBannersDiv = document.getElementById("error-banners");

  const onRegistrationSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const data = {
      username: usernameRef.current.value,
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await context.registerHandler(data);
      changeToLoginState();
    } catch (e) {
      errorDispach({ type: "ERROR", errors: e });
      setTimeout(() => {
        errorDispach({ type: "RESET" });
      }, 5000);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      <form
        method="post"
        onSubmit={onRegistrationSubmit}
        className={style.form}
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          ref={usernameRef}
        />
        <label htmlFor="email">Email:</label>

        <input
          type="text"
          name="email"
          id="email"
          ref={emailRef}
        />
        <label htmlFor="name">Name:</label>

        <input
          type="text"
          name="name"
          id="name"
          ref={nameRef}
        />
        <label htmlFor="password">Password:</label>

        <input
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
        />
        <input type="submit" value="Register" className={style.action} />

        {errorState.hasError &&
          errorState.errors.map((error, i) => {
            return createPortal(
              <ErrorBanner message={error} />,
              errorBannersDiv
            );
          })}
      </form>
    </>
  );
}
