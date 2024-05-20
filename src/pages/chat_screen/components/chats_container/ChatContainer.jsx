import React from "react";
import useWebSocket from "react-use-websocket";

import ChatBubble from "./ChatBubble";

import style from "./ChatContainer.module.css";

export default function ChatContainer({ messages }) {

  return (
    <div className={style.chat__container}>
      {messages.map((msgObj, index) => {
        const msg = JSON.parse(msgObj.data)["message"];
        return <ChatBubble key={index} type="send" text={msg} />;
      })}
    </div>
  );
}
