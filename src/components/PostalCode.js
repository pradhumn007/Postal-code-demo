import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { countryList } from "./countryList.data";

const countries = countryList;

export default function PostalCode({ onSubmit, onClearData }) {
  const [postCode, setPostCode] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("IN");
  const [isOpen, setIsOpen] = React.useState(false);

  const errMessage = "Invalid Input : Postal code should not be empty";

  function Validation() {
    if (postCode.length === 0) {
      throw "error";
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      Validation();
      onSubmit(countryCode, postCode);
    } catch (error) {
      setIsOpen(true);
      setTimeout(() => setIsOpen(false), 1500);
    }
  };

  const handlePostChange = (e) => {
    setPostCode(e.target.value);
  };
  const handleCountryChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleDataClear = (e) => {
    onClearData();
  };

  const handleClose = (event, reason) => {
    setIsOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        zIndex: "0",
      }}
    >
      {isOpen ? (
        <Alert severity="error" style={{ marginBottom: "1.5rem" }}>
          {errMessage}
        </Alert>
      ) : null}
      <Typography component="h1" variant="h5">
        Enter Postal Code
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={countryCode}
          required
          fullWidth
          label="Country"
          onChange={handleCountryChange}
        >
          {countries.map((option, index) => (
            <MenuItem key={index} value={option.countryCode}>
              {option.countryName}
            </MenuItem>
          ))}
        </Select>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Postal Code"
          onChange={handlePostChange}
          type="number"
          value={postCode}
          autoComplete="current-postal-code"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Search
        </Button>
        <Button
          type="button"
          fullWidth
          onClick={handleDataClear}
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
        >
          Clear Data
        </Button>
      </Box>
    </Box>
  );
}
