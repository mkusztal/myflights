import React from "react";
import "./App.css";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { HomePage } from "./components/pages/HomePage";
import { Link, Route, Routes } from "react-router-dom";
import { SingleFlightPage } from "./components/pages/SingleFlightPage";

const App: React.FC = () => {
  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Box sx={{ float: "left" }}>
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              <Typography variant='h3'>My Flights</Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/flight/:id' element={<SingleFlightPage />} />
      </Routes>
    </div>
  );
};

export default App;
