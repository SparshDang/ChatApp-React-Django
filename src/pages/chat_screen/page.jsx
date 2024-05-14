import React, { useEffect, useState, useContext } from "react";
import useWebSocket from "react-use-websocket";

import PersonTile from "./components/person_tile/PersonTile";
import SendChatForm from "./components/send_chat_form/SendChatForm";
import ChatContainer from "./components/chats_container/ChatContainer";
import AuthContext from "../../context/AuthContext";

import style from "./style.module.css";

export default function ChatsPage() {

  // const authContext = useContext(AuthContext);

  const [chatWith, setChatWith] = useState("sparsh");
  const url = `ws://${process.env.REACT_APP_API_URL}${chatWith}`;
  const { sendMessage, lastMessage } = useWebSocket(url);
  const [messages, setMessages] = useState([]);

  const onChatWithChange = (username) => {
    setChatWith(username);
  };



  useEffect(() => {
    if (lastMessage) {
      setMessages((prev) => [ lastMessage,...prev,]);
    }
  }, [lastMessage]);

  return (
    <div className={style.chat_view}>
      <div className={style.side__panel}>
        <PersonTile onClickHandler={onChatWithChange} current />
        <PersonTile onClickHandler={onChatWithChange} />
        <PersonTile onClickHandler={onChatWithChange} />
        <PersonTile onClickHandler={onChatWithChange} />
        <PersonTile onClickHandler={onChatWithChange} />
        <PersonTile onClickHandler={onChatWithChange} />
        <PersonTile onClickHandler={onChatWithChange} />
        <PersonTile onClickHandler={onChatWithChange} />
        <PersonTile onClickHandler={onChatWithChange} />
        <PersonTile onClickHandler={onChatWithChange} />
        <PersonTile onClickHandler={onChatWithChange} />
        <PersonTile onClickHandler={onChatWithChange} />
      </div>
      <div className={style.chat__screen}>
        <ChatContainer messages={messages} />
        <SendChatForm onSendMessageHandler={sendMessage} />
      </div>
    </div>
  );
}
