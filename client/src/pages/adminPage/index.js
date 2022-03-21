import React, { useEffect, useState } from "react";
import "./index.css";
import { Header } from "../../components/header";
import Accordion from "react-bootstrap/Accordion";
import { getCakes, getCupcakeParam } from "../../services/userService";
import { Button, Card, Spinner, Toast } from "react-bootstrap";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addCupCakeParam,
  addToNew,
  deleteCake,
  deleteCupCakeParam,
  deleteFromNew,
} from "../../services/adminService";
import { AddCake } from "../../components/addCake";

function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [filling, setFilling] = useState([]);
  const [base, setBase] = useState([]);
  const [cream, setCream] = useState([]);
  const [cake, setCake] = useState([]);
  const [bentocake, setBentocake] = useState([]);
  const [cupcake, setCupcake] = useState([]);
  const [newCream, setNewCream] = useState("");
  const [newFilling, setNewFilling] = useState("");
  const [newBase, setNewBase] = useState("");
  const [newItem, setNewItem] = useState({
    show: false,
    cake: { url: "", name: "", price: 0, description: "" },
    id: "0",
    type: "",
  });
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "light",
  });
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    document.title = "Панель управления";
  }, []);

  async function fetchData() {
    const data1 = await getCupcakeParam("filling");
    const data2 = await getCupcakeParam("base");
    const data3 = await getCupcakeParam("cream");
    const data4 = await getCakes("cake");
    const data5 = await getCakes("bentocake");
    const data6 = await getCakes("cupcake");
    setFilling(data1);
    setBase(data2);
    setCream(data3);
    setCake(data4);
    setBentocake(data5);
    setCupcake(data6);
  }

  useEffect(() => {
    fetchData();
  }, [update]);

  function deleteCupCakesParam(type, id) {
    deleteCupCakeParam(id);
    switch (type) {
      case "cream":
        setCream(cream.filter((value) => value.id !== id));
        break;
      case "filling":
        setFilling(filling.filter((value) => value.id !== id));
        break;
      case "base":
        setBase(base.filter((value) => value.id !== id));
        break;
      default:
        break;
    }
    setToast({
      ...toast,
      show: true,
      bg: "light",
      message: "Удалено",
    });
  }

  function onChangeCream(e) {
    setNewCream(e.target.value);
  }

  function onChangeFiling(e) {
    setNewFilling(e.target.value);
  }

  function onChangeBase(e) {
    setNewBase(e.target.value);
  }

  function onClickParam(type, name) {
    setIsLoading(true);
    addCupCakeParam(type, name);
    setToast({
      ...toast,
      show: true,
      bg: "success",
      message: "Добавлено",
    });
    switch (type) {
      case "cream":
        setCream([...cream, { id: name, item: { name } }]);
        setNewCream("");
        break;
      case "filling":
        setFilling([...filling, { id: name, item: { name } }]);
        setNewFilling("");
        break;
      case "base":
        setBase([...base, { id: name, item: { name } }]);
        setNewBase("");
        break;
      default:
        break;
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }

  function deleteCakeNow(type, id) {
    deleteCake(id);
    switch (type) {
      case "cake":
        setCake(cake.filter((value) => value.id !== id));
        break;
      case "bentocake":
        setBentocake(bentocake.filter((value) => value.id !== id));
        break;
      case "cupcake":
        setCupcake(cupcake.filter((value) => value.id !== id));
        break;
      default:
        break;
    }
  }

  return (
    <div className="admin-container">
      <Header />
      <Accordion className="accordionAdmin">
        <AddCake
          show={newItem.show}
          onHide={() => setNewItem({ ...newItem, show: false })}
          cake={newItem.cake}
          id={newItem.id}
          onUpdate={() => setUpdate(!update)}
          type={newItem.type}
        />
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
        <Accordion.Item className="accordAdmin" eventKey="0">
          <Accordion.Header>Крем</Accordion.Header>
          <Accordion.Body className="accordionBody">
            <div className="cupCakeListParam">
              {cream &&
                cream.map((item) => {
                  return (
                    <span className="cakeParamListItem" key={item.id}>
                      {item.item.name}{" "}
                      <FontAwesomeIcon
                        className="close-btn2"
                        icon={faTimes}
                        onClick={() => deleteCupCakesParam("cream", item.id)}
                      />
                    </span>
                  );
                })}
            </div>
            <div>
              <input maxLength={30} onChange={onChangeCream} value={newCream} />
              <Button
                variant="secondary"
                disabled={isLoading}
                onClick={() => onClickParam("cream", newCream)}
              >
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  hidden={!isLoading}
                />
                Добавить крем
              </Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className="accordAdmin" eventKey="1">
          <Accordion.Header>Начинка</Accordion.Header>
          <Accordion.Body>
            <div className="cupCakeListParam">
              {filling &&
                filling.map((item) => {
                  return (
                    <span className="cakeParamListItem" key={item.id}>
                      {item.item.name}{" "}
                      <FontAwesomeIcon
                        className="close-btn2"
                        icon={faTimes}
                        onClick={() => deleteCupCakesParam("filling", item.id)}
                      />
                    </span>
                  );
                })}
            </div>
            <div>
              <input
                maxLength={30}
                onChange={onChangeFiling}
                value={newFilling}
              />
              <Button
                variant="secondary"
                disabled={isLoading}
                onClick={() => onClickParam("filling", newFilling)}
              >
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  hidden={!isLoading}
                />
                Добавить начинку
              </Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className="accordAdmin" eventKey="2">
          <Accordion.Header>Основа</Accordion.Header>
          <Accordion.Body>
            <div className="cupCakeListParam">
              {base &&
                base.map((item) => {
                  return (
                    <span className="cakeParamListItem" key={item.id}>
                      {item.item.name}{" "}
                      <FontAwesomeIcon
                        className="close-btn2"
                        icon={faTimes}
                        onClick={() => deleteCupCakesParam("base", item.id)}
                      />
                    </span>
                  );
                })}
            </div>
            <div>
              <input maxLength={30} onChange={onChangeBase} value={newBase} />
              <Button
                variant="secondary"
                disabled={isLoading}
                onClick={() => onClickParam("base", newBase)}
              >
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  hidden={!isLoading}
                />
                Добавить основу
              </Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4" className="accordAdmin">
          <Accordion.Header>Торты</Accordion.Header>
          <Accordion.Body className="cardsAccords">
            <Card className="cardscontainer">
              <Card.Body>
                <Card.Title>Добавить новый</Card.Title>
                <Card.Text>Чтобы добавить новый - просто нажми ниже</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    setNewItem({
                      cake: { url: "", name: "", price: 0, description: "" },
                      show: true,
                      id: "0",
                      type: "cake",
                    });
                  }}
                >
                  Новый
                </Button>
              </Card.Body>
            </Card>
            {cake &&
              cake.map((item) => {
                return (
                  <Card className="cardscontainer" key={item.id}>
                    <div
                      className="cardImageAdminPanel"
                      style={{
                        background: `no-repeat center/cover url(${item.cake.url})`,
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{item.cake.name}</Card.Title>
                      <Card.Text>
                        <span className="descriptionAdminPanel">
                          {item.cake.price}
                          {"₽ - "}
                          {item.cake.description}
                        </span>
                      </Card.Text>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setNewItem({
                            ...item,
                            show: true,
                            type: "cake",
                          });
                        }}
                      >
                        Изменить
                      </Button>
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={async () => {
                          setIsLoading(true);
                          await addToNew(item.id);
                          setUpdate(!update);
                          setTimeout(() => {
                            setIsLoading(false);
                          }, 1000);
                        }}
                        hidden={item.cake.isNew}
                        disabled={isLoading}
                      >
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          hidden={!isLoading}
                        />
                        Добавить
                      </Button>
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={async () => {
                          setIsLoading(true);
                          await deleteFromNew(item.id);
                          setUpdate(!update);
                          setTimeout(() => {
                            setIsLoading(false);
                          }, 1000);
                        }}
                        hidden={!item.cake.isNew}
                      >
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          hidden={!isLoading}
                        />
                        Убрать
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteCakeNow("cake", item.id)}
                      >
                        Удалить
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5" className="accordAdmin">
          <Accordion.Header>Бенто-торты</Accordion.Header>
          <Accordion.Body className="cardsAccords">
            <Card className="cardscontainer">
              <Card.Body>
                <Card.Title>Добавить новый</Card.Title>
                <Card.Text>Чтобы добавить новый - просто нажми ниже</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    setNewItem({
                      cake: { url: "", name: "", price: 0, description: "" },
                      show: true,
                      id: "0",
                      type: "bentocake",
                    });
                  }}
                >
                  Новый
                </Button>
              </Card.Body>
            </Card>
            {bentocake &&
              bentocake.map((item) => {
                return (
                  <Card className="cardscontainer" key={item.id}>
                    <div
                      className="cardImageAdminPanel"
                      style={{
                        background: `no-repeat center/cover url(${item.cake.url})`,
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{item.cake.name}</Card.Title>
                      <Card.Text>
                        <span className="descriptionAdminPanel">
                          {item.cake.price}
                          {"₽ - "}
                          {item.cake.description}
                        </span>
                      </Card.Text>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setNewItem({
                            ...item,
                            show: true,
                            type: "bentocake",
                          });
                        }}
                      >
                        Изменить
                      </Button>
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={async () => {
                          setIsLoading(true);
                          await addToNew(item.id);
                          setUpdate(!update);
                          setTimeout(() => {
                            setIsLoading(false);
                          }, 1000);
                        }}
                        hidden={item.cake.isNew}
                        disabled={isLoading}
                      >
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          hidden={!isLoading}
                        />
                        Добавить
                      </Button>
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={async () => {
                          setIsLoading(true);
                          await deleteFromNew(item.id);
                          setUpdate(!update);
                          setTimeout(() => {
                            setIsLoading(false);
                          }, 1000);
                        }}
                        hidden={!item.cake.isNew}
                      >
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          hidden={!isLoading}
                        />
                        Убрать
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteCakeNow("bentocake", item.id)}
                      >
                        Удалить
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6" className="accordAdmin">
          <Accordion.Header>Капкейки</Accordion.Header>
          <Accordion.Body className="cardsAccords">
            <Card className="cardscontainer">
              <Card.Body>
                <Card.Title>Добавить новый</Card.Title>
                <Card.Text>Чтобы добавить новый - просто нажми ниже</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    setNewItem({
                      cake: { url: "", name: "", price: 0, description: "" },
                      show: true,
                      id: "0",
                      type: "cupcake",
                    });
                  }}
                >
                  Новый
                </Button>
              </Card.Body>
            </Card>
            {cupcake &&
              cupcake.map((item) => {
                return (
                  <Card className="cardscontainer" key={item.id}>
                    <div
                      className="cardImageAdminPanel"
                      style={{
                        background: `no-repeat center/cover url(${item.cake.url})`,
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{item.cake.name}</Card.Title>
                      <Card.Text>
                        <span className="descriptionAdminPanel">
                          {item.cake.price}
                          {"₽ - "}
                          {item.cake.description}
                        </span>
                      </Card.Text>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setNewItem({
                            ...item,
                            show: true,
                            type: "cupcake",
                          });
                        }}
                      >
                        Изменить
                      </Button>
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={async () => {
                          setIsLoading(true);
                          await addToNew(item.id);
                          setUpdate(!update);
                          setTimeout(() => {
                            setIsLoading(false);
                          }, 1000);
                        }}
                        hidden={item.cake.isNew}
                        disabled={isLoading}
                      >
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          hidden={!isLoading}
                        />
                        Добавить
                      </Button>
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={async () => {
                          setIsLoading(true);
                          await deleteFromNew(item.id);
                          setUpdate(!update);
                          setTimeout(() => {
                            setIsLoading(false);
                          }, 1000);
                        }}
                        hidden={!item.cake.isNew}
                      >
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          hidden={!isLoading}
                        />
                        Убрать
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteCakeNow("cupcake", item.id)}
                      >
                        Удалить
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export { AdminPage };
