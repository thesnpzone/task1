import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Registration from "../components/Registration";
import StudentRegister from "../components/StudentRegister";
import InstituteRegister from "../components/InstituteRegister";
import IndustryRegister from "../components/IndustryRegister";
import Login from "../components/Login";
import StudentDashboard from "../components/StudentDashboard";
import StudentPrivateRoute from "./StudentPrivateRoute";
import StudentUpdateDetails from "../components/StudentUpdateDetails";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/register/institute" element={<InstituteRegister />} />
        <Route path="/register/industry" element={<IndustryRegister />} />
        <Route element={<StudentPrivateRoute />}>
          <Route path="/dashboard" element={<StudentDashboard />} />
        </Route>
        <Route element={<StudentPrivateRoute />}>
          <Route path="/student/update-details" element={<StudentUpdateDetails />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
