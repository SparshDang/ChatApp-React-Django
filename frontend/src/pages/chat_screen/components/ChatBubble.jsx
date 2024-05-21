import React from 'react'

import style from './ChatBubble.module.css';


export default function ChatBubble({data, user}) {
    const send_or_recieve = data.username === user ? style.send : style.recieve;
  return (
    <div className={`${style.bubble} ${send_or_recieve}`}>
      {data.message}
    </div>
  )
}
