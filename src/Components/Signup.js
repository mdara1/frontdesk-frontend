import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createUser } from "../apis";

const SignUp = () => {
  const navigate = useNavigate();
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    passwordMatchError: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignUp = () => {
    // Simulate sign-up logic for demonstration purposes
    // Replace this with your actual sign-up logic
    if (formData.password !== formData.confirmPassword) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        passwordMatchError: true,
      }));
      return;
    }
    let payload = {
      email: formData.email,
      name: formData.name,
      password: formData.password,
      role: "STUDENT",
    };
    createUserAsync(payload);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };

  const createUserAsync = async (payload) => {
    await createUser(payload).then((resp) => {
      if (resp.status !== 200) {
        setDialogTitle("Error");
        setDialogMessage("Internal server error");
        navigate("/login");
      } else {
        setDialogTitle("Signup successful");
        setDialogMessage("Your account has been successfully created!");
        setOpen(true);
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
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
          id="name"
          name="name"
          label="Name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          style={{ marginTop: "10px" }}
          id="email"
          name="email"
          label="Email"
          placeholder="Email"
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
        />
        <TextField
          style={{ marginTop: "10px" }}
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={formData.passwordMatchError}
          helperText={
            formData.passwordMatchError ? "Passwords do not match" : ""
          }
        />
      </div>
      <Button
        variant="contained"
        onClick={handleSignUp}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        Sign Up
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Continue to Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignUp;
