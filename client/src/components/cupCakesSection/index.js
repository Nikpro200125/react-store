import React, { useEffect, useState } from "react";
import "./index.css";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import { getCakes, getCupcakeParam } from "../../services/userService";
import { StoreItem } from "../storeItem";
import { useDispatch } from "react-redux";
import { AddToCartModal } from "../addToCart";
import { Spinner, Toast } from "react-bootstrap";

function CupCakesSection() {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "light",
  });
  const [tortItems, setTortItems] = useState();
  const [filling, setFilling] = useState(null);
  const [base, setBase] = useState(null);
  const [cream, setCream] = useState(null);
  const [selected, setSelected] = useState({
    filling: "",
    base: "",
    cream: "",
  });
  const [cartItems, setCartItems] = useState({
    show: false,
    cake: { url: "", name: "", price: 0, description: "" },
    id: "",
    amount: 1,
  });
  useEffect(() => {
    async function fetchData() {
      const data = await getCakes("cupcake");
      setTortItems(data);
      const data1 = await getCupcakeParam("filling");
      const data2 = await getCupcakeParam("base");
      const data3 = await getCupcakeParam("cream");
      setFilling(data1);
      setBase(data2);
      setCream(data3);
    }

    fetchData();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  function makeid(s) {
    let hash = 0,
      i,
      chr,
      length = s.length;
    if (length === 0) return hash;
    for (i = 0; i < length; i++) {
      chr = s.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash.toString();
  }

  const addItemCupcake = () => {
    if (
      selected.filling === "" ||
      selected.base === "" ||
      selected.cream === ""
    ) {
      setToast({
        ...toast,
        show: true,
        bg: "light",
        message: "Вы выбрали НЕ все параметры",
      });
      return;
    }
    setIsLoading(true);
    dispatch({
      type: "ADD_ITEM_CUPCAKE",
      value: {
        params: {
          filling: selected.filling,
          base: selected.base,
          cream: selected.cream,
        },
        id: makeid(selected.filling + selected.base + selected.cream),
        amount: 1,
      },
    });
    setToast({
      ...toast,
      show: true,
      bg: "success",
      message: "Капкейк добавлен",
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };
  return (
    <div className="containerCakesMain">
      <AddToCartModal
        show={cartItems.show}
        onHide={() => setCartItems({ ...cartItems, show: false })}
        cake={cartItems.cake}
        id={cartItems.id}
        amount={cartItems.amount}
      />
      <div id="cupcakes" />
      <div className="header">Меню капкейков</div>
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
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Собрать капкейк самому</Accordion.Header>
          <Accordion.Body className="cupCakeSectionAccord">
            <Dropdown
              id="firstdrop"
              onSelect={(eventKey) => {
                setSelected({ ...selected, cream: eventKey });
              }}
            >
              <Dropdown.Toggle variant="success" className="dropchik">
                Крем
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropMargin">
                {cream &&
                  cream.map((item) => {
                    return (
                      <Dropdown.Item
                        className="itemHeight"
                        key={item.id}
                        eventKey={item.item.name}
                      >
                        {item.item.name}
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown
              id="seconddrop"
              onSelect={(eventKey) => {
                setSelected({ ...selected, filling: eventKey });
              }}
            >
              <Dropdown.Toggle variant="success" className="dropchik">
                Начинка
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropMargin">
                {filling &&
                  filling.map((item) => {
                    return (
                      <Dropdown.Item
                        className="itemHeight"
                        key={item.id}
                        eventKey={item.item.name}
                      >
                        {item.item.name}
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown
              id="thirddrop"
              onSelect={(eventKey) => {
                setSelected({ ...selected, base: eventKey });
              }}
            >
              <Dropdown.Toggle variant="success" className="dropchik">
                Основа
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropMargin">
                {base &&
                  base.map((item) => {
                    return (
                      <Dropdown.Item
                        className="itemHeight"
                        key={item.id}
                        eventKey={item.item.name}
                      >
                        {item.item.name}
                      </Dropdown.Item>
                    );
                  })}
              </Dropdown.Menu>
            </Dropdown>
            <div className="menuCupCake">
              <div className="headerMenuCupCake">
                <span>Вы выбрали</span>
              </div>
              <div className="cupCakeContent">
                <div id="cream" className="container-center">
                  <div>Крем</div>
                  <div>
                    {selected.cream === "" ? "Не выбрано" : selected.cream}
                  </div>
                </div>
                <div id="filling" className="container-center">
                  <div>Начинка</div>
                  <div>
                    {selected.filling === "" ? "Не выбрано" : selected.filling}
                  </div>
                </div>
                <div id="base" className="container-center">
                  <div>Основа</div>
                  <div>
                    {selected.base === "" ? "Не выбрано" : selected.base}
                  </div>
                </div>
                <div className="container-center knopkaContainer d-flex">
                  <button
                    className="knopkaZakaza"
                    onClick={() => addItemCupcake()}
                  >
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      hidden={!isLoading}
                    />
                    Добавить в корзину
                  </button>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Toast
        onClose={() =>
          setToast({
            ...toast,
            show: false,
          })
        }
        show={toast.show}
        delay={3000}
        bg={toast.bg}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Уведомление</strong>
        </Toast.Header>
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>
    </div>
  );
}

export { CupCakesSection };
