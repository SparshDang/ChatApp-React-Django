import React from 'react'

import style from './ErrorBanner.module.css';

export default function ErrorBanner({message}) {
  
  return (
    <div className={style.banner}>
      {message}
    </div>
  )
}
