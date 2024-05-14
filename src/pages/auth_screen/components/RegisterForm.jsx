import React, { useContext, useRef, useReducer } from "react";
import { createPortal } from "react-dom";

import ErrorBanner from "../../../components/ErrorBanner";

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

export default function RegisterForm() {
  const context = useContext(authContext);
  const [errorState, errorDispach] = useReducer(errorReducer, {
    hasError: false,
    errors: [],
  });

  const usernameRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const errorBannersDiv = document.getElementById("error-banners");

  const onRegistrationSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username: usernameRef.current.value,
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await context.registerHandler(data);
    } catch (e) {
      errorDispach({type:"ERROR", errors:[e]})
      setTimeout(
        () => {errorDispach({type:"RESET"})}, 5000
      )
    }
  };



  return (
    <form method="post" onSubmit={onRegistrationSubmit} className={style.form}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="username"
        ref={usernameRef}
      />
      <label htmlFor="email">Email:</label>

      <input
        type="text"
        name="email"
        id="email"
        placeholder="email"
        ref={emailRef}
      />
      <label htmlFor="name">Name:</label>

      <input
        type="text"
        name="name"
        id="name"
        placeholder="name"
        ref={nameRef}
      />
      <label htmlFor="password">Password:</label>

      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
        ref={passwordRef}
      />
      <input type="submit" value="Register" className={style.action} />

      {errorState.hasError &&
        errorState.errors.map((error, i) => {
            console.log("Ge", error);
            return createPortal(<ErrorBanner message={error.message} />, errorBannersDiv);
        }
        )
        }

    </form>

  );
}
