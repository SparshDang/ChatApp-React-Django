import React from 'react'


import PersonTile from "./components/person_tile/PersonTile";
import SendChatForm from "./components/send_chat_form/SendChatForm";
import ChatContainer from "./components/chats_container/ChatContainer";

import style from './style.module.css';

export default function ChatsPage() {
  return (
    <div className={style.chat_view}>
      <div className={style.side__panel}>
        <PersonTile current/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
        <PersonTile/>        
      </div>
      <div className={style.chat__screen}>
          <ChatContainer/>
          <SendChatForm/>
      </div>
    </div>
  )
}
