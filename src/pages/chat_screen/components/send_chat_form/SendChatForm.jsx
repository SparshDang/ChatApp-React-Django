import React, {useRef} from "react";
import { IoSend } from "react-icons/io5";

import style from "./SendChatForm.module.css";

export default function SendChatForm({onSendMessageHandler}) {
  const messageRef = useRef();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const msg = messageRef.current.value;
    const data = {
      "message" : msg
    }
    onSendMessageHandler(JSON.stringify(data))

  }
  return (
    <div className={style.form__container}>
      <form className={style.form} onSubmit={onSubmitHandler}>
        <input type="text"  className={style.chat__input} ref={messageRef}/>
        <button type="submit" className={style.submit__btn}>
          <IoSend />
        </button>
      </form>
    </div>
  );
}
