import React from 'react'

import style from './ChatBubble.module.css'

export default function ChatBubble({type,text}) {
  return (
    <div className={`${style.bubble} ${type === 'send' ? style.send : style.recieve}`}>
        <p>{text}</p>
    </div>
  )
}
