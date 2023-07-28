import View from "./Components/View";
import Login from "./Components/Login";
import Admin from "./Components/Admin";

import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/view/:email/:role" element={<View />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <h1>Hello CodeSandbox</h1>
    //   <h2>Start editing to see some magic happen!</h2>
    // </div>
  );
}
