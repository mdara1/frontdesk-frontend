import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { UserProvider } from "./contexts/UserContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <UserProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </UserProvider>
);
