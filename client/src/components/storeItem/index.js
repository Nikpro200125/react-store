import React from "react";
import "./index.css";
import { faRubleSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StoreItem(props) {
  return (
    <div
      className="storeItem"
      style={{ backgroundImage: `url(${props.cake.url})` }}
    >
      <span className="storeItemPrice">
        {props.cake.price}
        <FontAwesomeIcon icon={faRubleSign} />
      </span>
      <span className="storeItemName">{props.cake.name}</span>
      <div className="storeItemDescription" onClick={props.onClick}>
        <div className="storeItemDescriptionInner">Открыть</div>
      </div>
    </div>
  );
}

export { StoreItem };
