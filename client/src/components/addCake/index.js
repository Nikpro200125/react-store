import "./index.css";
import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner, Toast } from "react-bootstrap";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorDiv } from "../errorDiv";
import {
  addCakes,
  updateCakes,
  updateCakesWithout,
} from "../../services/adminService";

function AddCake(props) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "light",
  });
  const [newItem, setNewItem] = useState({
    url: "",
    name: "",
    price: 0,
    weight: 0,
    description: "",
    id: "0",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState();
  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    setNewItem({
      ...{
        url: "",
        name: "",
        price: 0,
        description: "",
        weight: 0,
        id: "0",
      },
      ...props.cake,
      id: props.id,
    });
    setFile(null);
    setHasImage(false);
  }, [props]);

  async function onSubmit() {
    if (
      newItem.name === "" ||
      newItem.description === "" ||
      newItem.price === 0 ||
      newItem.price === null ||
      newItem.weight === 0 ||
      newItem.weight === null ||
      (hasImage && !file)
    ) {
      setError(true);
      setIsLoading(false);
      return;
    }
    setError(false);
    setIsLoading(true);

    if (newItem.id === "0") {
      if (!hasImage || !file) {
        setError(true);
        setIsLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("description", newItem.description);
      formData.append("price", newItem.price);
      formData.append("image", file);
      formData.append("weight", newItem.weight);
      await addCakes(props.type, formData).then(
        () => {
          setIsLoading(false);
          setToast({
            ...toast,
            show: true,
            bg: "light",
            message: "Готово",
          });
          props.onUpdate();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setError(resMessage);
        }
      );
    } else {
      if (hasImage) {
        const formData = new FormData();
        formData.append("name", newItem.name);
        formData.append("description", newItem.description);
        formData.append("price", newItem.price);
        formData.append("image", file);
        formData.append("weight", newItem.weight);
        await updateCakes(newItem.id, formData).then(
          () => {
            setIsLoading(false);
            setToast({
              ...toast,
              show: true,
              bg: "light",
              message: "Готово",
            });
            props.onUpdate();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setError(resMessage);
          }
        );
      } else {
        const formData = {
          name: newItem.name,
          description: newItem.description,
          price: newItem.price,
          weight: newItem.weight,
        };
        await updateCakesWithout(newItem.id, formData).then(
          () => {
            setIsLoading(false);
            setToast({
              ...toast,
              show: true,
              bg: "light",
              message: "Готово",
            });
            props.onUpdate();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            setError(resMessage);
          }
        );
      }
    }
  }

  function onChangeName(e) {
    setNewItem({ ...newItem, name: e.target.value });
  }

  function onChangeDescription(e) {
    setNewItem({ ...newItem, description: e.target.value });
  }

  function onChangePrice(e) {
    if (e.target.value >= 0 && e.target.value < 1000000) {
      setNewItem({ ...newItem, price: e.target.value });
    }
  }

  function onChangeWeight(e) {
    if (e.target.value >= 0 && e.target.value <= 5) {
      setNewItem({ ...newItem, weight: e.target.value });
    }
  }

  function onChangeFile(e) {
    setFile(e.target.files[0]);
  }

  function onChangeHasImage() {
    setHasImage(!hasImage);
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
        <FontAwesomeIcon
          className="close-btn3"
          icon={faTimes}
          onClick={props.onHide}
        />
        <form className="addCakeForm">
          <h3>Создание/изменение продукта</h3>
          <div className="addCakeFormInput">
            <span>Название товара</span>
            <input
              type="text"
              maxLength="30"
              name="name"
              value={newItem.name}
              onChange={onChangeName}
            />
          </div>
          <div className="addCakeFormInput">
            <span>Описание товара</span>
            <textarea
              maxLength="1000"
              name="description"
              value={newItem.description}
              onChange={onChangeDescription}
            />
          </div>
          <div className="addCakeFormInput">
            <span>Цена товара</span>
            <input
              type="number"
              min="0"
              max="1000000"
              name="price"
              value={newItem.price}
              onChange={onChangePrice}
            />
          </div>
          <div className="addCakeFormInput">
            <span>Вес товара</span>
            <input
              type="number"
              min="0"
              max="5"
              name="weight"
              value={newItem.weight}
              onChange={onChangeWeight}
            />
          </div>
          <div>
            <input
              type="checkbox"
              value={hasImage}
              onChange={onChangeHasImage}
            />
            <span>Обновить картинку</span>
          </div>
          <div className="addCakeFormInput">
            <span>Изображение товара</span>
            <input
              name="image"
              type="file"
              disabled={!hasImage}
              accept="image/*"
              onChange={onChangeFile}
            />
            {file && (
              <img className="previewImage" src={preview} alt="preview" />
            )}
          </div>
          {error && (
            <ErrorDiv error={{ message: "Все поля должны быть заполнены" }} />
          )}
          <Button onClick={onSubmit} disabled={isLoading}>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
              hidden={!isLoading}
            />
            Подтвердить
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export { AddCake };
