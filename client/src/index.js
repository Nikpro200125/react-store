import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { AppRouter } from "./services/router";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <AppRouter />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
