import React, { useEffect, useState } from "react";
import "./index.css";
import { Carousel } from "react-bootstrap";
import { getCarouselItems } from "../../services/userService";

function CarouselSection() {
  const [carouselItems, setCarouselItems] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getCarouselItems();
      setCarouselItems(data);
    }

    fetchData();
  }, []);
  if (carouselItems.length !== 0) {
    return (
      <div className="container-fluid justify-content-center d-flex">
        <Carousel className="carousel" data-testid="carousel">
          {carouselItems &&
            carouselItems.map((item) => {
              return (
                <Carousel.Item interval={3000} key={item.id}>
                  <div
                    className="carouselItem"
                    style={{ backgroundImage: `url(${item.cake.url})` }}
                  />
                  <Carousel.Caption className="textCarousel">
                    <h3>{item.cake.name}</h3>
                    <p>{item.cake.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </div>
    );
  } else {
    return null;
  }
}

export { CarouselSection };
