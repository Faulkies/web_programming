// src/components/common/BackButton.jsx
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function BackButton({ fallback = "/", children = "Back" }) {
  const nav = useNavigate();
  return (
    <Button
      variant="text"
      startIcon={<ArrowBackIcon />}
      onClick={() => {
        if (window.history.length > 1) nav(-1);
        else nav(fallback);
      }}
      sx={{ mb: 2 }}
    >
      {children}
    </Button>
  );
}
