import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FriendTile from "./components/FriendTile";
import authContext from "../../context/AuthContext";

import style from "./page.module.css";
import Loader from "../../components/Loader";

export default function FriendsPage() {
  const context = useContext(authContext);
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!context.userData.isAuthenticated) {
      navigate("/auth");
    }
    getFriends();
    setLoading(false);
  }, [navigate,context]);

  const getFriends = async () => {
    const url = "http://" + process.env.REACT_APP_API_URL + "friends";
    const request = await fetch(url, {
      credentials: "include",
    });
    const data = await request.json();
    if (data) {
      setFriends(data);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <h2 className={style.heading}>Friends</h2>
      <div className={style.friends__container}>
        {friends.map((friend,index) => {
          return <FriendTile username={friend} key={index}/>
        })}
      </div>
    </>
  );
}
