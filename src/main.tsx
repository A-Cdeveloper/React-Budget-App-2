import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";

import { BudgetContextProvider } from "./context/BudgetContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BudgetContextProvider>
    <App />
  </BudgetContextProvider>
);
