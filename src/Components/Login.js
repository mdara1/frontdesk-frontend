import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    //handle auth call and navigate
    navigate("/admin");
  };
  let [username, setUsername] = useState("");
  let [pwd, setPwd] = useState("");
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "20rem",
          justifyContent: "center"
        }}
      >
        <TextField
          id="username"
          label="Username "
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          style={{ marginTop: "10px" }}
          id="outlined-password-input"
          label="Password"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <Button
        variant="contained"
        onClick={onClickHandler}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px"
        }}
      >
        Login
      </Button>
    </>
  );
};
export default Login;
