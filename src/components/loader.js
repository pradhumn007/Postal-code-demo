import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./Loader.css";

export default function Loader() {
  return (
    <Box
      className="Loader"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CircularProgress className="loader-icon" />
    </Box>
  );
}
