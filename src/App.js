import React, { useState } from "react";
import "./App.css";
import PostalCode from "./components/PostalCode";
import ShowData from "./components/ShowData";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FetchData from "./api";
import Loader from "./components/loader";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const defaultTheme = createTheme();

const App = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (countryCode, postCode) => {
    setIsLoading(true);
    FetchData(countryCode, postCode)
      .then((respData) => {
        let tempPlaces = [];
        if (respData && respData.places) {
          if (Array.isArray(respData.places)) {
            tempPlaces = respData.places.map((item) => {
              return {
                country: respData.country,
                state: item.state,
                place: item["place name"],
              };
            });
          }
        }
        setPlaces(tempPlaces);
      })
      .catch((error) => {
        setIsOpen(true);
      })
      .finally(() => setIsLoading(false));
  };

  const clearData = () => {
    setPlaces([]);
  };

  const handleClose = (event, reason) => {
    setIsOpen(false);
  };

  return (
    <div>
      {isLoading ? <Loader /> : null}
      <ThemeProvider theme={defaultTheme}>
        <Container className="external" component="main" maxWidth="s">
          <CssBaseline />
          <PostalCode onSubmit={handleSubmit} onClearData={clearData} />
          <ShowData places={places} />
        </Container>
      </ThemeProvider>

      <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error">Error fetching postal data!</Alert>
      </Snackbar>
    </div>
  );
};

export default App;
