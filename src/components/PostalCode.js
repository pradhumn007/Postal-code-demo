import * as React from "react";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { countryList } from "./countryList.data";

// TODO remove, this demo shouldn't need to reset the theme.

const countries = countryList;

export default function PostalCode({ onSubmit }) {
  const [postCode, setPostCode] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("US");
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(countryCode, postCode);
  };

  const handlePostChange = (e) => {
    setPostCode(e.target.value);
  };
  const handleCountryChange = (e) => {
    setCountryCode(e.target.value);
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
      </Box>
    </Box>
  );
}
