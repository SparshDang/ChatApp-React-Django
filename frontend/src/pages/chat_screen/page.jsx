import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { IoSend } from "react-icons/io5";

import authContext from "../../context/AuthContext";
import ChatBubble from "./components/ChatBubble";

import style from "./page.module.css";

export default function ChatPage() {
  const context = useContext(authContext);
  const navigate = useNavigate();

  const params = useParams();
  const friend = params.friend;
  const websocketEndPoint = [context.userData.username, friend]
    .sort()
    .join("-");
  const { sendMessage, lastMessage } = useWebSocket(
    "ws://" + process.env.REACT_APP_API_URL + `api/${websocketEndPoint}`
  );

  const backBtnHandler = () => {
    navigate("/");
  };

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const fetchLatest10Messages = async () => {
    const url = "http://" + process.env.REACT_APP_API_URL + "messages";
    const request = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        socket: websocketEndPoint,
      }),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();
    setMessages(data);
  };

  useEffect(() => {
    if (!context.userData.isAuthenticated) {
      navigate("/auth");
    }
  }, [navigate, context]);

  useEffect(() => {
    fetchLatest10Messages();
  }, []);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      setMessages((prev) => {
        return [data, ...prev];
      });
    }
  }, [lastMessage]);

  const sendMessageHandler = (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      return;
    }
    sendMessage(
      JSON.stringify({
        username: context.userData.username,
        message: message,
      })
    );

    setMessage("");
  };

  return (
    <>
      <div className={style.chat__page}>
        <div className={style.chats__container}>
          {messages.map((data, index) => {
            return (
              <ChatBubble
                key={index}
                data={data}
                user={context.userData.username}
              />
            );
          })}
        </div>
        <div className={style.send__form}>
          <form onSubmit={sendMessageHandler}>
            <input
              type="text"
              className={style.msg__input}
              onChange={(event) => setMessage(event.target.value)}
              value={message}
            />
            <button type="submit" className={style.send__btn}>
              <IoSend />
            </button>
          </form>
        </div>
      </div>
      <div className={style.secondary__header}>
        <h2 className={style.friend__username}>{friend}</h2>
        <button className={style.back__btn} onClick={backBtnHandler}>
          Back
        </button>
      </div>
    </>
  );
}
