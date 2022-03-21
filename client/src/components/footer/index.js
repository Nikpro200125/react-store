import React from "react";
import "./index.css";
import { ReactComponent as Logo } from "../../assets/images_mainPage/Logo.svg";
import { Container, Nav } from "react-bootstrap";

function Footer() {
  return (
    <Container>
      <div className="d-flex align-items-center footerContainer">
        <Logo className="logo" />
        <Nav.Link className="fontFooter nav-item" data-testid="item" href="/#main">Главная</Nav.Link>
        <Nav.Link className="fontFooter nav-item" data-testid="item" href="/#main">О мне</Nav.Link>
        <Nav.Link className="fontFooter nav-item" data-testid="item" href="/#cakes">Торты</Nav.Link>
        <Nav.Link className="fontFooter nav-item" data-testid="item" href="/cart">Корзина</Nav.Link>
      </div>
    </Container>
  );
}

export { Footer };
