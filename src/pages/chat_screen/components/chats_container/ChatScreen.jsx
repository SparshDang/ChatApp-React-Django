import React, {useEffect, useState} from 'react'
import useWebSocket from "react-use-websocket";


import ChatContainer from './ChatContainer';
import SendChatForm from '../send_chat_form/SendChatForm';

import style from './CharScreen.module.css';

export default function ChatScreen({chatWith}) {
    const url = `ws://${process.env.REACT_APP_API_URL}${chatWith}`;
    const { sendMessage, lastMessage } = useWebSocket(url);
  
    const [messages, setMessages] = useState([]);
  
  
    useEffect(() => {
      if (lastMessage) {
        setMessages((prev) => [lastMessage, ...prev]);
      }
    }, [lastMessage]);
  return (
    <div className={style.chat__screen}>
    <ChatContainer messages={messages} />
    <SendChatForm onSendMessageHandler={sendMessage}  />
  </div>
  )
}
