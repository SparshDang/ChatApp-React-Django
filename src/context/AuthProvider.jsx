import React, { useState } from "react";

import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  let [userData, setUserDataState] = useState({
    isAuthenticated:false
  });

  const registerHandler = async (data) => {
    const url = "http://" + process.env.REACT_APP_API_URL + "register";
    const req = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const response = await req.json();

    if (response.status !== 200) {
      const errorsArray = [];

      Object.keys(response).forEach((errorField) => {
        response[errorField].forEach((error) => {
          errorsArray.push(`${errorField} : ${error}`);
        });

      });

      throw errorsArray;
    }
  };

  const loginHandler = async (data) => {
    const url = "http://" + process.env.REACT_APP_API_URL + "login";
    const req = await fetch(url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const response = await req.json();
    if (response.status === 200) {
      await setUserData();
    } else {
      throw Error(response.detail);
    }
  };

  const setUserData = async () => {
    const url = "http://" + process.env.REACT_APP_API_URL + "user";
    const request = await fetch(url, {
      credentials: "include",
    });
    const response = await request.json();
    if (response.status === 200) {
      const data = { ...response, isAuthenticated: true };
      delete data.response;
      setUserDataState(data);
    } else {
      if (userData.isAuthenticated) {
        setUserDataState({ isAuthenticated: false });
      }
    }
  };

  const logoutHandler = async () => {
    const url = "http://" + process.env.REACT_APP_API_URL + "logout";
    await fetch(url, {
      credentials: "include",
    });
    setUserDataState({isAuthenticated:false})
  };

  return (
    <AuthContext.Provider
      value={{
        userData: userData,
        setUser: setUserData,
        logoutHandler: logoutHandler,
        loginHandler: loginHandler,
        registerHandler: registerHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
