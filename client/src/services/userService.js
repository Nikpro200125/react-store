import axios from "axios";

async function getCarouselItems() {
  return fetch("/api/carousel")
    .then((res) => res.json())
    .then((res) => res.collection);
}

function getCakes(type) {
  return fetch("/api/cakes/" + type)
    .then((res) => res.json())
    .then((res) => res.collection);
}

function getCupcakeParam(type) {
  return fetch("/api/cupcakes/" + type)
    .then((res) => res.json())
    .then((res) => res.collection);
}

function sendOrder(text) {
  axios.post("/api/order", {
    text: text,
  });
}

export { getCarouselItems, getCakes, sendOrder, getCupcakeParam };
