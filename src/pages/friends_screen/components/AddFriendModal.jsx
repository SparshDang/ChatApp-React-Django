import React, { useState, useReducer } from "react";
import { createPortal } from "react-dom";

import ErrorBanner from "../../../components/ErrorBanner";

import style from "./AddFriendModal.module.css";

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

export default function AddFriendModal({ closeModal }) {
  const [username, setUsername] = useState("");
  const [errorState, errorDispach] = useReducer(errorReducer, {
    hasError: false,
    errors: [],
  });

  const errorBannersDiv = document.getElementById("error-banners");

  const addFriend = async (event) => {
    event.preventDefault();
    const url = "http://" + process.env.REACT_APP_API_URL + "add-friend";

    try {
      const request = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          friend: username,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await request.json();
      if (data.status !== 200){
        throw Error(data)
      }

    
      closeModal();
    } catch (e) {
        errorDispach({ type: "ERROR", errors: [e] });
        setTimeout(() => {
          errorDispach({ type: "RESET" });
        }, 5000);
    }
  };

  return (
    <div className={style.modal}>
      <div className={style.form__container}>
        <h3>Add Friend</h3>
        <form action="/" onSubmit={addFriend}>
          <label htmlFor="friend">Friend's Username : </label>
          <input
            type="text"
            name="friend"
            id="friend"
            className={style.input}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            value={username}
          />
          <div className={style.actions}>
            <button onClick={closeModal}>Close</button>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
      {errorState.hasError &&
        errorState.errors.map((error, i) => {
          return createPortal(
            <ErrorBanner message={error.message} />,
            errorBannersDiv
          );
        })}
    </div>
  );
}
