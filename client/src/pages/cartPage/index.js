import React, { useEffect } from "react";
import "./index.css";
import { Cart } from "../../components/cart";
import { Header } from "../../components/header";

function CartPage() {
  useEffect(() => {
    document.title = "Корзина";
  }, []);
  return (
    <div className="cartcontainer">
      <Header />
      <Cart />
    </div>
  );
}

export { CartPage };
