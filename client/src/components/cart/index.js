import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../cartItem";
import "./index.css";
import { Button, Spinner } from "react-bootstrap";
import { sendOrder } from "../../services/userService";

function Cart() {
  const itemsProduct = useSelector((state) => state.products);
  const itemsCupcake = useSelector((state) => state.cupcakes);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function order() {
    setIsLoading(true);
    let text = "";
    let counter = 1;
    for (let i = 0; i < itemsProduct.length; i++, counter++) {
      text +=
        counter +
        ". " +
        itemsProduct[i].cake.name +
        "(" +
        itemsProduct[i].id +
        ") " +
        itemsProduct[i].cake.price +
        " x " +
        itemsProduct[i].amount +
        "\n";
    }
    for (let i = 0; i < itemsCupcake.length; i++, counter++) {
      text +=
        counter +
        ". Cамособранный капкейк состав (начинка: " +
        itemsCupcake[i].params.filling +
        ", основа: " +
        itemsCupcake[i].params.base +
        ", крем: " +
        itemsCupcake[i].params.cream +
        ") x " +
        itemsCupcake[i].amount;
    }
    sendOrder(text);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    dispatch({
      type: "DELETE_ALL",
    });
  }

  return (
    <div className="cart">
      <h3>Корзина</h3>
      {itemsCupcake &&
        itemsCupcake.length > 0 &&
        itemsCupcake.map((item) => {
          return <CartItem item={item} key={item.id} type="cupcake" />;
        })}
      {itemsProduct &&
        itemsProduct.length > 0 &&
        itemsProduct.map((item) => {
          return <CartItem item={item} key={item.id} type="cake" />;
        })}
      {itemsProduct &&
        itemsProduct.length === 0 &&
        itemsCupcake &&
        itemsCupcake.length === 0 && <span>Товаров пока нет...</span>}
      {((itemsProduct && itemsProduct.length > 0) ||
        (itemsCupcake && itemsCupcake.length > 0)) && (
        <div className="buttonOrder">
          <Button onClick={() => order()} disabled={isLoading}>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
              hidden={!isLoading}
            />
            Заказать
          </Button>
        </div>
      )}
    </div>
  );
}

export { Cart };
