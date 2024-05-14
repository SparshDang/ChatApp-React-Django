import React from 'react'
import { Outlet, Link } from 'react-router-dom';

import style from './BasePage.module.css';

export default function BasePage() {
  return (
    <div>
      <header className={style.header}>
        <div className={style.leading}>
          <h1 className={style.heading}>
            Chat App
          </h1>
        </div>
        <div className={style.trailing}>
          <Link to='/auth' className={style.action_btn}>Login</Link>
        </div>
      </header>
      <div id="error-banners"></div>
      <Outlet/>
    </div>
  )
}
