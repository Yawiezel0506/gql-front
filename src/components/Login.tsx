import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../rtk/hooks";
import { setOpen as setOpenSignUp } from "../rtk/flagSignUpSlice";
import { setOpen as setOpenLogIn } from "../rtk/flagLogInSlice";
import { setUserName } from "../rtk/userNameSlice";
import { setUserNameInCart } from "../rtk/cartSlice";
import { Alert, Collapse, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styleButton } from "../style/login&Signin";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openAlertEmail, setOpenAlertEmail] = useState(false);
  const [openAlertPassword, setOpenAlertPassword] = useState(false);
  const dispatch = useAppDispatch();

  const open = useAppSelector((state) => state.openLogIn.flag);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return (
      password.length >= 7 &&
      (/[A-Z]/.test(password) || /[a-z]/.test(password)) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const handleClickOpen = () => {
    dispatch(setOpenLogIn(true));
  };

  const handleClose = () => {
    dispatch(setOpenLogIn(false));
  };

  const notify = () => {
    toast.success("You've logged in successfully!", {
      theme: "colored"
    })
  }

  const baseURL = import.meta.env.VITE_SERVER_API;

  const handleLogIn = async () => {
    if (validateEmail(email) && validatePassword(password)) {
      try {
        const userData = {
          email: email,
          password: password,
        };
        const response = await axios.post(
          `${baseURL}/users/login`,
          userData
        );
        if (response.data) {
          const userName = response.data.user;
          setEmail("");
          setPassword("");
          dispatch(setUserName(userName));
          dispatch(
            setUserNameInCart(`${userName.firstName} ${userName.lastName}`)
          );
          localStorage.setItem('email', email)
          localStorage.setItem('password', password)
          notify()
        }
      } catch (error) {
        console.error("Error during registration:", error);
        dispatch(setOpenSignUp(true));
      }
      dispatch(setOpenLogIn(false));
    }
    if (!validatePassword(password)) {
      setOpenAlertPassword(true);
    }
    if (!validateEmail(email)) {
      setOpenAlertEmail(true);
    }
  };

  const handleRegistration = () => {
    dispatch(setOpenSignUp(true));
    dispatch(setOpenLogIn(false));
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Log IN
      </Button> */}
      <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClickOpen}
        >
          <VpnKeyOutlinedIcon/>
        </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign: 'center'}}>Log in</DialogTitle>
        <DialogContent>
          <DialogContentText style={{textAlign: 'center'}}>
            To log in, please enter your email and password.
          </DialogContentText>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
              setOpenAlertEmail(false);
            }}
            value={email}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            required
            error={!email}
            helperText={!email ? "This is a required field." : ""}
          />
          <Collapse in={openAlertEmail}>
            <Alert severity="error" sx={{ margin: "0.5em" }}>
              Invalid email
            </Alert>
          </Collapse>
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
              setOpenAlertPassword(false);
            }}
            value={password}
            margin="dense"
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            error={!password}
            helperText={
              !password ? "This is a required field." : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Collapse in={openAlertPassword}>
            <Alert severity="error" sx={{ margin: "0.5em" }}>
              Invalid password
            </Alert>
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" sx={styleButton} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" sx={styleButton} onClick={handleLogIn}>
            Sign in
          </Button>
          <Button
            variant="contained"
            sx={styleButton}
            onClick={handleRegistration}
          >
            Don't have a user account?
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </React.Fragment>
  );
};

export default LogIn;
