import View from "./Components/View";
import Login from "./Components/Login";
import { useUserContext } from "./contexts/UserContext";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Signup";
import Admin from "./Components/Admin";

export default function App() {
  const { user } = useUserContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login setUser={user.setUser} isNewUser={user.isNewUser} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/view" element={<View />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <h1>Hello CodeSandbox</h1>
    //   <h2>Start editing to see some magic happen!</h2>
    // </div>
  );
}
