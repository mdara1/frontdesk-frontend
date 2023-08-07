import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../apis";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    // Simulate successful login for demonstration purposes
    // Replace this with your actual authentication logic
    //console.log("Email:", formData.email);
    //console.log("Password:", formData.password);
    validate(formData);
    //navigate("/validate", {state: formData});
    // navigate("/view", { state: formData });
  };

  const handleSignUp = () => {
    // Redirect to sign up page
    navigate("/signup");
  };

  const validate = async (formData) => {
    let payload = { email: formData.email, password: formData.password };
    await validateUser(payload)
      .then((resp) => {
        if (resp.status === 401) {
          setDialogTitle("Invalid Credentials"); // Set the dialog title
          setDialogMessage("Incorrect Password!");
          setOpen(true);
        } else if (resp.status === 404) {
          setDialogTitle("Invalid Credentials"); // Set the dialog title
          setDialogMessage("Invalid email");
          setOpen(true);
        } else if (resp.status === 200) {
          console.log("Login successful");
          return resp.json();
        } else {
          setDialogTitle("Error");
          setDialogMessage("Internal Server Error");
          setOpen(true);
        }
      })
      .then((data) => {
        if (data.data?.role === "STUDENT") {
          navigate("/view", { state: data.data });
        } else {
          navigate("/admin", { state: data.data });
        }
      });
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center horizontally
        justifyContent: "center", // Center vertically
        height: "100vh", // Make the container full height of the viewport
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "20rem",
        }}
      >
        <TextField
          id="email"
          name="email"
          label="Email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          style={{ marginTop: "10px" }}
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
      </div>
      <Button
        variant="contained"
        onClick={handleLogin}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        Login
      </Button>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Don't have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={handleSignUp}
        >
          Sign Up
        </span>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle></DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Login;
