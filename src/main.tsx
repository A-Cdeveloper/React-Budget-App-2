import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";

import Providers from "./Providers.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>
);
