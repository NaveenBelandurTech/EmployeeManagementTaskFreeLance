import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./utils/store";
import "./output.css";

const Container = document.getElementById("root");
const Root = createRoot(Container);
Root.render(
  <Provider store={Store}>
    <App />
  </Provider>,
);
