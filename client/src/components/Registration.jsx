import React from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "../css/Registration.css";

import Register_page_img from "../assets/Register_page_img.png";
import MyCustomButton from "./MyCustomButton";

import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import useStudentSession from "../hooks/useStudentSession";

const Registration = () => {
  const navigate = useNavigate();

  const handleNavigation = (type) => {
    navigate(`/register/${type}`);
  };

  const { isLoggedIn, loading } = useStudentSession();

  if (loading) return null;
  if (isLoggedIn) return <Navigate to="/dashboard" />;

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
            <img src={Register_page_img} className="img-fluid" alt="" />
          </div>

          {/* Right vaala  Section - Role Selection Buttons*/}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="w-75 role-selection-font">
              <h3
                className="text-left mb-4"
                style={{ fontSize: "2.5rem", fontWeight: "600" }}
              >
                🚀 Start Your Journey with
                <span className="highlighted-text"> SkillPilots</span> As,
              </h3>
              <div className="">
                <MyCustomButton
                  label=" a Student"
                  onClick={() => handleNavigation("student")}
                  color="220, 70%"
                  Icon={PersonIcon}
                />{" "}
                <br />
                <MyCustomButton
                  label=" an Institute"
                  onClick={() => handleNavigation("institute")}
                  color="120, 50%"
                  Icon={SchoolIcon}
                />
                <br />
                <MyCustomButton
                  label=" an Industry"
                  onClick={() => handleNavigation("industry")}
                  color="340, 60%"
                  Icon={BusinessIcon}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Registration;
