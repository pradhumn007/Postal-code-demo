import React, { useState } from "react";
import "./App.css";
import PostalCode from "./components/PostalCode";
import ShowData from "./components/ShowData";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FetchData from "./api";
import Loader from "./components/loader";

const defaultTheme = createTheme();

const App = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (countryCode, postCode) => {
    setIsLoading(true);
    FetchData(countryCode, postCode).then((respData) => {
      let tempPlaces = [];
      setIsLoading(false);
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
    });
  };

  const clearData = () => {
    setPlaces([]);
  };

  return (
    <div className="external">
      {isLoading ? <Loader /> : null}
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="s">
          <CssBaseline />
          <PostalCode onSubmit={handleSubmit} onClearData={clearData} />
          <ShowData places={places} />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default App;
