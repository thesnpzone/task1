import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Autocomplete,
  Chip,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const steps = ["Student Details", "Contact Details", "Terms & Conditions"];
const skillOptions = [
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "Python",
  "Java",
  "C++",
  "Data Structures",
  "Algorithms",
];
const cityList = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Jaipur",
];

const StudentUpdateDetails = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    currentCity: "",
    homeCity: "",
    skills: [],
    tnc: false,
    subscribe: true,
  });

  const [dobError, setDobError] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/students/dashboard", {
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data;
        setForm((prev) => ({
          ...prev,
          fullName: data.fullName || "",
          email: data.email || "",
          mobile: data.mobile || "",
          dob: data.dob ? dayjs(data.dob).format("YYYY-MM-DD") : "",
          gender: data.gender || "",
          currentCity: data.currentCity || "",
          homeCity: data.homeCity || "",
          skills: data.skills || [],
        }));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      await axios.put(
        "http://localhost:8000/api/students/update-details",
        {
          fullName: form.fullName,
          dob: form.dob,
          gender: form.gender,
          currentCity: form.currentCity,
          homeCity: form.homeCity,
          skills: form.skills,
        },
        { withCredentials: true }
      );

      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.response?.data?.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Box sx={{ width: "80%", mx: "auto", mt: 4 }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Typography variant="h5" mb={2}>
        Complete Your Profile
      </Typography>
      <Stepper activeStep={activeStep}>
        {steps.map((label, idx) => (
          <Step key={idx}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>
        {activeStep === 0 && (
          <>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
              error={!!dobError}
              helperText={dobError} // Display error if dobError is set
            />
            <FormControl sx={{ mb: 2 }}>
              <RadioGroup
                row
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              fullWidth
              label="Email"
              value={form.email}
              disabled
              sx={{ mb: 2 }}
            />
          </>
        )}

        {activeStep === 1 && (
          <>
            <TextField
              fullWidth
              label="Mobile"
              value={form.mobile}
              disabled
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Current City</InputLabel>
              <Select
                name="currentCity"
                value={form.currentCity}
                onChange={handleChange}
                label="Current City"
              >
                {cityList.map((city, i) => (
                  <MenuItem key={i} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Home City</InputLabel>
              <Select
                name="homeCity"
                value={form.homeCity}
                onChange={handleChange}
                label="Home City"
              >
                {cityList.map((city, i) => (
                  <MenuItem key={i} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Autocomplete
              multiple
              options={skillOptions}
              value={form.skills}
              onChange={(e, newValue) => {
                setForm((prev) => ({ ...prev, skills: newValue }));
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    key={option}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Skills"
                  placeholder="Select or type a skill"
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
              freeSolo
            />
          </>
        )}

        {activeStep === 2 && (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  name="tnc"
                  checked={form.tnc}
                  onChange={handleChange}
                />
              }
              label="I accept the Terms & Conditions"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="subscribe"
                  checked={form.subscribe}
                  onChange={handleChange}
                />
              }
              label="Subscribe to mail updates"
            />
          </>
        )}
      </Box>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.tnc}
          >
            Submit
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default StudentUpdateDetails;
