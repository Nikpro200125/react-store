import React from "react";
import "./index.css";

function HelloSection() {
  return (
    <div id="main" className="container-formHello">
      <span className="leftSide">
        Торты, капкейки и пирожные ручной работы на заказ
      </span>
      <a className="buttonMenu" href="#cakes">
        Перейти в меню
      </a>
      <div className="ogromniyTort" />
    </div>
  );
}

export { HelloSection };
