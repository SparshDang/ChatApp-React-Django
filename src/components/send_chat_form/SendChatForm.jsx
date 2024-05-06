import React from "react";
import { IoSend } from "react-icons/io5";

import style from "./SendChatForm.module.css";

export default function SendChatForm() {
  return (
    <div className={style.form__container}>
      <form className={style.form}>
        <input type="text"  className={style.chat__input}/>
        <button type="submit" className={style.submit__btn}>
          <IoSend />
        </button>
      </form>
    </div>
  );
}
