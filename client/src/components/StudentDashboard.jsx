import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, CardHeader, Chip, Grid, Typography } from "@mui/material";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/students/dashboard", { withCredentials: true })
      .then((res) => {
        const data = res.data;
  
        // Optional: Log data to verify values
        console.log("Dashboard data:", data);
  
        const requiredFields = ["dob", "gender", "currentCity", "homeCity", "skills"];
        const isIncomplete = requiredFields.some((field) => {
          const value = data[field];
  
          // Fix for dob: must be a valid date string
          if (field === "dob") {
            return !value || isNaN(new Date(value).getTime());
          }
  
          // Fix for skills: must be a non-empty array
          if (field === "skills") {
            return !Array.isArray(value) || value.length === 0;
          }
  
          // General check for empty strings or null
          return value === undefined || value === null || (typeof value === "string" && value.trim() === "");
        });
  
        if (isIncomplete) {
          console.warn("Redirecting to update-details due to incomplete profile");
          navigate("/student/update-details");
        } else {
          setStudent(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching dashboard data", err);
        navigate("/login");
      });
  }, [navigate]);
  

  if (!student) return <p>Loading...</p>;

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto', mt: 4, boxShadow: 3 }}>
      <CardHeader title="Student Profile" sx={{ textAlign: 'center', bgcolor: '#1976d2', color: 'white' }} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              {student.fullName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1"><strong>Email:</strong> {student.email}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1"><strong>Mobile:</strong> {student.mobile}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1"><strong>DOB:</strong> {new Date(student.dob).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1"><strong>Gender:</strong> {student.gender}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1"><strong>Current City:</strong> {student.currentCity}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1"><strong>Home City:</strong> {student.homeCity}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom><strong>Skills:</strong></Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {student.skills.map((skill, index) => (
                <Chip key={index} label={skill} color="primary" />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" display="block" mt={2}>
              Profile created at: {new Date(student.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="caption" display="block">
              Last updated at: {new Date(student.updatedAt).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudentDashboard;
