import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";

import Student_Register_page_img from "../assets/Student_Register_page_img.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// OTP timer utility
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
};

const StudentRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(180); // 3 minutes
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);

  useEffect(() => {
    if (step === 1 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (step === 1 && timer === 0) {
      setOtpExpired(true);

      setTimeout(() => {
        setFormData({
          email: "",
          mobile: "",
          otp: "",
          password: "",
          confirmPassword: "",
        });
        setStep(0);
        setTimer(180);
        setOtpExpired(false);
      }, 20);
    }
  }, [step, timer]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);



    try {
      const res = await axios.post(
        "http://localhost:8000/api/students/register",
        {
          email: formData.email,
          mobile: formData.mobile,
        }
      );

      toast.success(res.data.message);
      setStep(1); // Move to OTP verification step
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (otpExpired) {
      toast.success("OTP expired! Please request a new OTP.");
      setStep(0); // Go back to step 1
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/students/verify-otp",
        {
          email: formData.email,
          otp: formData.otp,
          password: formData.password,
        }
      );

      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <motion.div
      className="container-fluid vh-100"
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
    <ToastContainer position="top-right" autoClose={3000} />
      <div className="row h-100">
        {/* Left Section */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-image text-white">
          <img src={Student_Register_page_img} className="img-fluid" alt="" />
        </div>

        {/* Right Section */}
        <div className="col-md-6 d-flex align-items-center justify-content-center p-4">
          <Card
            sx={{
              width: "100%",
              maxWidth: 450,
              borderRadius: "30px",
              boxShadow: 6,
            }}
          >
            <CardContent>
              <Typography variant="h5" className="mb-4 text-center">
                Student Registration
              </Typography>

              <Stepper
                sx={{
                  "& .MuiStepIcon-root": {
                    color: "#ccc", // default icon color
                  },
                  "& .MuiStepIcon-root.Mui-completed": {
                    color: "#7e57c2", // completed step icon
                  },
                  "& .MuiStepIcon-root.Mui-active": {
                    color: "#7e57c2", // active step icon
                  },
                  "& .MuiStepLabel-label": {
                    color: "#7e57c2", // default label color
                  },
                  "& .MuiStepLabel-label.Mui-active": {
                    color: "#7e57c2",
                    fontWeight: "bold",
                  },
                  "& .MuiStepLabel-label.Mui-completed": {
                    color: "#7e57c2",
                  },
                  "& .MuiStepConnector-line": {
                    borderColor: "#7e57c2",
                  },
                }}
                activeStep={step}
                alternativeLabel
              >
                <Step>
                  <StepLabel>Basic Info</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Verify OTP</StepLabel>
                </Step>
              </Stepper>

              {step === 0 && (
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    error={
                      formData.email &&
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                    }
                    helperText={
                      formData.email &&
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                        ? "Please enter a valid email"
                        : ""
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "#7e57c2" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& label.Mui-focused": { color: "#7e57c2" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#7e57c2" },
                        "&:hover fieldset": { borderColor: "#7e57c2" },
                        "&.Mui-focused fieldset": { borderColor: "#7e57c2" },
                      },
                    }}
                  />

                  <TextField
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    name="mobile"
                    margin="normal"
                    value={formData.mobile}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/\D/g, "");
                      setFormData((prev) => ({ ...prev, mobile: onlyNums }));
                    }}
                    error={formData.mobile && formData.mobile.length !== 10}
                    helperText={
                      formData.mobile && formData.mobile.length !== 10
                        ? "Mobile number must be exactly 10 digits"
                        : ""
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={{ color: "#7e57c2" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& label.Mui-focused": { color: "#7e57c2" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#7e57c2" },
                        "&:hover fieldset": { borderColor: "#7e57c2" },
                        "&.Mui-focused fieldset": { borderColor: "#7e57c2" },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    className="mt-3"
                  >
                    {loading ? "Submitting..." : "Next"}
                  </Button>
                </form>
              )}

              {step === 1 && (
                <form onSubmit={handleOtpSubmit}>
                  <Typography variant="h6" align="center" className="mb-4">
                    OTP expires in: {formatTime(timer)}
                  </Typography>

                  <TextField
                    label="OTP"
                    variant="outlined"
                    fullWidth
                    name="otp"
                    margin="normal"
                    value={formData.otp}
                    onChange={handleChange}
                    sx={{
                      "& label": { color: "#7e57c2" },
                      "& label.Mui-focused": { color: "#7e57c2" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#7e57c2" },
                        "&:hover fieldset": { borderColor: "#7e57c2" },
                        "&.Mui-focused fieldset": { borderColor: "#7e57c2" },
                      },
                    }}
                  />



                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    margin="normal"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    sx={{
                      "& label": { color: "#7e57c2" },
                      "& label.Mui-focused": { color: "#7e57c2" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#7e57c2" },
                        "&:hover fieldset": { borderColor: "#7e57c2" },
                        "&.Mui-focused fieldset": { borderColor: "#7e57c2" },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />



                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    className="mt-3"
                  >
                    {loading ? "Verifying..." : "Verify OTP and Set Password"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentRegister;
