import React, { useEffect, useState } from "react";
import "../cakesSection/index.css";
import { getCakes } from "../../services/userService";
import { StoreItem } from "../storeItem";
import { AddToCartModal } from "../addToCart";

function BentoCakesSection() {
  const [tortItems, setTortItems] = useState();
  const [cartItems, setCartItems] = useState({
    show: false,
    cake: { url: "", name: "", price: 0, description: "" },
    id: "",
    amount: 1,
  });
  useEffect(() => {
    async function fetchData() {
      const data = await getCakes("bentocake");
      setTortItems(data);
    }

    fetchData();
  }, []);
  return (
    <div className="containerCakesMain">
      <AddToCartModal
        show={cartItems.show}
        onHide={() => setCartItems({ ...cartItems, show: false })}
        cake={cartItems.cake}
        id={cartItems.id}
        amount={cartItems.amount}
      />
      <div id="bentocakes" />
      <div className="header">Меню Бенто-тортов</div>
      <div className="containerCakes">
        {tortItems &&
          tortItems.map((item) => (
            <StoreItem
              cake={item.cake}
              key={item.id}
              onClick={() => {
                setCartItems({
                  ...item,
                  show: true,
                  amount: 1,
                });
              }}
            />
          ))}
      </div>
    </div>
  );
}

export { BentoCakesSection };
