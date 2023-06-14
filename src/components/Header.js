import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//import { Button, CircularProgress, Stack, TextField } from "@mui/material";
//import { Avatar, Button, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
 // console.log(children, "jkhkjgjgjhjh");
  const history = useHistory();
 
  
  //   if(isLog != null){
  //     setIsloggin(true);
  //   }
  // },[isLog]);

  const [token, username, balance] = [
    localStorage.getItem("token"),
    localStorage.getItem("username"),
    localStorage.getItem("balance"),
  ];
  //console.log(localStorage.getItem("token"));
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("balance");
    window.location.reload();
    // setIsloggin(false);
    // history.push(");
  };
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {children}
      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => {
            history.push("/");
          }}
        >
          Back to explore
        </Button>
      ) : 
      
      localStorage.getItem("token") ? (
        <Box sx={{ display: "flex" }}>
          <img src="avatar.png" alt={username} className="avatar" />
          <Box className="username-text">
          {username}
          </Box>
          <Button
            variant="text"
            sx={{ marginLeft: "1em" }}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Box>
        
      )  
       : (
        <Box>
          <Button
            variant="text"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              history.push("/register");
            }}
          >
            Register
          </Button>
        </Box>
        
      )}
      
    </Box>
    
  );
};

export default Header;
