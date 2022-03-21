import axios from "axios";

function deleteCupCakeParam(id) {
  axios.delete("/api/cupcakes/" + id);
}

function addCupCakeParam(type, name) {
  axios.post("/api/cupcakes/" + type, { name: name });
}

function deleteCake(id) {
  axios.delete("/api/cakes/" + id);
}

function addCakes(type, data) {
  return axios.post("/api/cakes/" + type, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
}

function updateCakes(id, data) {
  return axios.put("/api/cakes/" + id, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
}

function updateCakesWithout(id, data) {
  return axios.put("/api/cakes/without/" + id, data);
}

function addToNew(id) {
  return axios.post("/api/carousel/" + id);
}

function deleteFromNew(id) {
  return axios.delete("/api/carousel/" + id);
}

export {
  deleteCupCakeParam,
  addCupCakeParam,
  deleteCake,
  updateCakes,
  updateCakesWithout,
  addCakes,
  addToNew,
  deleteFromNew,
};
