import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory,Link} from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history=useHistory();
    const[fields,setFields]=useState({
      u_name:"",
      pass_code:"",
      confirmPassword:""
    })
 const[loading,setLoading]=useState(false);
// const handleInput=(e)=>{
//   //const[key,value]=[e.target.name,e.target.value];
//   setFields({
//     ...fields,[e.target.name]:e.target.value
//   });
// }
const handleInput = (e) => {
  setFields({
    ...fields,
    [e.target.name]: e.target.value
  });
};

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (fields) => {
    
    // let valid=validateInput(fields)
    //   if(valid){
      console.log(fields,"fields");
      if (!validateInput(fields)) return;
    try{
      setLoading(true);
          await axios.post(`${config.endpoint}/auth/register`,{
        username:fields.u_name,
        password:fields.pass_code,
      });
     // setTimeout(()=>{
        setLoading(false);
     // },2000);
      //setTimeout(() => {
        //setLoading(false);
     // }, 3000);
      setFields({
        u_name:"",
        pass_code:"",
        confirmPassword:"",
      });
      // history.push("/login",{from:"Register"});
      history.push("/login");
      enqueueSnackbar("Registered Successfully",{variant:"success"});
    }
    catch(e){
      setLoading(false);
      if(e.response){
        enqueueSnackbar(e.response.data.message,{variant:"error"});
      }
      else{
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and return valid JSON.", {variant:"error"});
      }
  }
  };
  
  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
   const validateInput = (data) => {
    console.log(data);
    if (!data.u_name) {
      enqueueSnackbar("Username is a required filed", { variant: "warning" });
      return false;
    }
    if (data.u_name.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }
    if (!data.pass_code) {
      enqueueSnackbar("Password is a required filed", { variant: "warning" });
      return false;
    }
    if (data.pass_code.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }
    if (data.pass_code !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "warning" });
      return false;
    }
    return true;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="u_name"
            placeholder="Enter Username"
            fullWidth
            value={fields.u_name}
            onChange={handleInput}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="pass_code"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={fields.pass_code}
            onChange={handleInput}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={fields.confirmPassword}
            onChange={handleInput}
          />
          {loading &&(
            <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress size={25} color="primary"/>
            </Box>
     ) }     
         {!loading && (
           <Button className="button" variant="contained"
           onClick={()=>register(fields)}
           >
            Register Now
           </Button>
  )}
          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to={"/login"} >Login Now</Link>.
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
