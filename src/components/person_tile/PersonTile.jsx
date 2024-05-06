import React from "react";

import style from './PersonTile.module.css';

import profile_img from "../../test_assets/profile_pic.jpeg";

export default function PersonTile({current}) {
  return (
    <div className={`${style.person_tile} ${current ? style.current : ""}`}>
      <img src={profile_img} className={style.profile_img} alt="" />
      <h3>Sparsh</h3>
    </div>
  );
}
