import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import PersonTile from "./components/person_tile/PersonTile";
import ChatScreen from "./components/chats_container/ChatScreen";
import authContext from "../../context/AuthContext";

import style from "./style.module.css";

export default function ChatsPage() {
  const context = useContext(authContext);
  const navigate = useNavigate();

  const [chatWith, setChatWith] = useState("");

  const onChatWithChange = (username) => {
    setChatWith(username);
  };

  useEffect(() => {
    if (!context.userData.isAuthenticated) {
      navigate("/auth");
    }
  }, []);

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
      {chatWith && <ChatScreen chatWith={chatWith}/>}
    </div>
  );
}
