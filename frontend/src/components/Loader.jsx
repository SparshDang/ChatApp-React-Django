import React from "react";

import style from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={style.loader__overlay}>
      <div className={style.loader}>
        <span className={style.bar}></span>
        <span className={style.bar}></span>
        <span className={style.bar}></span>
      </div>
    </div>
  );
}
