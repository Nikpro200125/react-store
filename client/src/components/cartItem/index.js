import React from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

function CartItem(props) {
  const dispatch = useDispatch();

  function deleteItem(id) {
    dispatch({
      type: "DELETE_ITEM_FROM_LIST",
      value: { id: id },
    });
  }

  if (props.type === "cake") {
    return (
      <div className="cartItemDiv">
        <div
          className="cartItemImage"
          style={{ backgroundImage: `url(${props.item.cake.url})` }}
        />
        <div className="cartItemName">{props.item.cake.name}</div>
        <div className="cartItemAmount">{props.item.amount}</div>
        <div>{props.item.cake.price}₽</div>
        <FontAwesomeIcon
          icon={faTrash}
          color="red"
          onClick={() => deleteItem(props.item.id)}
          className="deleteItemButton"
        />
      </div>
    );
  } else {
    return (
      <div className="cartItemDiv">
        <div className="cartItemImageCupcake" />
        <div className="cartItemName">
          Начинка: {props.item.params.filling}
          <br />
          Основа: {props.item.params.base}
          <br />
          Крем: {props.item.params.cream}
        </div>
        <div className="cartItemAmount">{props.item.amount}</div>
        <div>{115.4}₽</div>
        <FontAwesomeIcon
          icon={faTrash}
          color="red"
          onClick={() => deleteItem(props.item.id)}
          className="deleteItemButton"
        />
      </div>
    );
  }
}

export { CartItem };
