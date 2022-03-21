import "./index.css";
import React, { useState } from "react";
import { Badge, Button, Modal, Spinner, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";

function AddToCartModal(props) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "light",
  });
  const [amount, setAmount] = useState(props.amount);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const addItem = (cake, id, amount) => {
    if (!(amount > 0 && amount < 21)) {
      setToast({
        ...toast,
        show: true,
        bg: "light",
        message: "Вы забыли добавить товар",
      });
      return;
    }
    setIsLoading(true);
    dispatch({
      type: "ADD_ITEM_FROM_LIST",
      value: { cake: cake, id: id, amount: amount },
    });
    setToast({
      ...toast,
      show: true,
      bg: "success",
      message: "Добавлено в корзину!",
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  function amountOnChange(e) {
    const value = e.target.value;
    if (value >= 0 && value < 21) {
      setAmount(value);
    }
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-90w"
      size="xl"
    >
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
      <Modal.Body>
        <div
          className="modal_image"
          style={{ backgroundImage: `url(${props.cake.url})` }}
        />
        <div className="rightSide" />
        <div className="cakeName">{props.cake.name}</div>
        <Badge bg="danger" className="cakeNameBadge">
          Новинка
        </Badge>
        <h4 className="cakeDescriptionHeader">Description</h4>
        <p className="cakeDescription">{props.cake.description}</p>
        <FontAwesomeIcon
          className="close-btn"
          icon={faTimes}
          onClick={props.onHide}
        />
        <input
          type="number"
          className="addToCartInput"
          min="1"
          max="20"
          value={amount}
          onChange={amountOnChange}
        />
        <Button
          className="addItemToCart"
          variant="secondary"
          disabled={isLoading}
          onClick={() => addItem(props.cake, props.id, amount)}
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
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export { AddToCartModal };
