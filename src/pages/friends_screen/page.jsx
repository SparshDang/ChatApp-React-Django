import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FriendTile from "./components/FriendTile";
import authContext from "../../context/AuthContext";

import style from "./page.module.css";

export default function FriendsPage() {
  const context = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!context.userData.isAuthenticated) {
      navigate("/auth");
    }
  }, []);

  return (
    <>
      <h2 className={style.heading}>Friends</h2>
      <div className={style.friends__container}>
            <FriendTile username={"Sparsh"}/>
            <FriendTile username={"Sparsh"}/>
            <FriendTile username={"Sparsh"}/>
            <FriendTile username={"Sparsh"}/>
            <FriendTile username={"Sparsh"}/>
      </div>
    </>
  );
}
