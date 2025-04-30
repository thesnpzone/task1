import React, { useState } from "react";

import Login_page_img from "../assets/Login_page_img.png";

import { motion } from "framer-motion";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import useStudentSession from "../hooks/useStudentSession";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { isLoggedIn, loading } = useStudentSession();

  if (loading) return null;
  if (isLoggedIn) return <Navigate to="/dashboard" />;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/students/login",
        formData,
        { withCredentials: true }
      );
      console.log(response.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <motion.div
      className="container-fluid vh-100"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-fluid vh-100">
        <div className="row h-100">
          {/* Left vaala  Section  - Image */}
          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center text-white overlay-bg">
            <img src={Login_page_img} className="img-fluid" alt="" />
          </div>

          {/* Right vaala  Section - Role Selection Buttons*/}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h4" gutterBottom color="" className="text-center">
                  Student Login
                </Typography>

                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="email"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: "#7e57c2" }} />
                        </InputAdornment>
                      ),
                    }}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "#7e57c2" }} />
                        </InputAdornment>
                      ),
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

                  {error && (
                    <Typography color="error" variant="body2" mt={1}>
                      {error}
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{
                      mt: 2,
                      bgcolor: "#7e57c2",
                      "&:hover": { bgcolor: "#6a1b9a" },
                    }}
                  >
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
