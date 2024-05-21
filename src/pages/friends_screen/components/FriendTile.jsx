import React from 'react'
import { useNavigate } from 'react-router-dom';

import style from './FriendTile.module.css';

export default function FriendTile({username, openModal, isAddFriendTile}) {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/${username}`)
  }
  return (
    <div className={style.tile} onClick={isAddFriendTile ? openModal : onClickHandler}>
      <h3>{username}</h3>
    </div>
  )
}
