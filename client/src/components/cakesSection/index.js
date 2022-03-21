import React, { useEffect, useState } from "react";
import "./index.css";
import { getCakes } from "../../services/userService";
import { StoreItem } from "../storeItem";
import { AddToCartModal } from "../addToCart";

function CakesSection() {
  const [tortItems, setTortItems] = useState();
  const [cartItems, setCartItems] = useState({
    show: false,
    cake: { url: "", name: "", price: 0, description: "" },
    id: "",
    amount: 1,
  });
  useEffect(() => {
    async function fetchData() {
      const data = await getCakes("cake");
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
      <div id="cakes" />
      <div className="header">Меню тортов</div>
      <div className="containerCakes">
        {tortItems &&
          tortItems.map((item) => (
            <StoreItem
              cake={item.cake}
              key={item.id}
              onClick={() => {
                setCartItems({
                  ...item,
                  amount: 1,
                  show: true,
                });
              }}
            />
          ))}
      </div>
    </div>
  );
}

export { CakesSection };
