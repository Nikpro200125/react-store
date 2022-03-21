import React from "react";
import "./index.css";
import { ReactComponent as Logo } from "../../assets/images_mainPage/Logo.svg";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <Navbar className="navigaciya fixed-top" expand="xxl" collapseOnSelect>
      <Container>
        <Navbar.Brand className="ks" href="/#main">
          <Logo data-testid="logo" className="d-inline-block align-top logo" />
          Kate's Sweets
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link data-testid="item" className="nav-item" href="/#main">
              Главная
            </Nav.Link>
            <Nav.Link data-testid="item" className="nav-item" href="/#cakes">
              Торты
            </Nav.Link>
            <Nav.Link
              data-testid="item"
              className="nav-item"
              href="/#bentocakes"
            >
              Бенто-торты
            </Nav.Link>
            <Nav.Link data-testid="item" className="nav-item" href="/#cupcakes">
              Капкейки
            </Nav.Link>
            <Nav.Link
              data-testid="item"
              className="nav-item"
              href="tel:89999999999"
            >
              8-999-999-99-99
            </Nav.Link>
            <Nav.Link data-testid="item" className="nav-item" href="/cart">
              Корзина <FontAwesomeIcon icon={faShoppingCart} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export { Header };
