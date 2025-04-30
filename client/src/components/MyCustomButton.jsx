// components/MyCustomButton.jsx
import React from "react";
import "../css/MyCustomButton.css"; // Contains your .button CSS
import { Box } from "@mui/material";

const MyCustomButton = ({ label, onClick, color = "240, 40%", Icon }) => {
  return (
    <button
      className="button"
      style={{ "--back-color": color }}
      onClick={onClick}
    >
      {Icon && (
        <Box component={Icon} sx={{ fontSize: 20 }} />
      )}
      {label}
    </button>
  );
};

export default MyCustomButton;
