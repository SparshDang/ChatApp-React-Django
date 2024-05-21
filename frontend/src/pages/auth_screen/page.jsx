import React, { useState } from "react";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

import style from "./page.module.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={style.forms__container}>
      {isLogin && (
        <>
          <h2>Login</h2>
          <LoginForm />
          <p>
            Not have an account{" "}
            <span
              className={style.helper}
              onClick={() => setIsLogin((prev) => !prev)}
            >
              Sign In
            </span>
          </p>
        </>
      )}
      {!isLogin && (
        <>
          <h2>Register</h2>

          <RegisterForm changeToLoginState={() => setIsLogin(true)} />
          <p>
            Already have an account{" "}
            <span
              className={style.helper}
              onClick={() => setIsLogin((prev) => !prev)}
            >
              Login
            </span>
          </p>
        </>
      )}
    </div>
  );
}
