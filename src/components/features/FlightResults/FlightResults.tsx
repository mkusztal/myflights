import React from "react";
import { Card, CardContent, Typography, Grid2, Box } from "@mui/material";
import { Flight } from "../../../interfaces/types";
import { useNavigate } from "react-router-dom";

interface FlightResultsProps {
  flights: Flight[];
}

export const FlightResults: React.FC<FlightResultsProps> = ({ flights }) => {
  const navigate = useNavigate();

  const handleCardClick = (flight: Flight) => {
    navigate(`/flight/${flight.departure.city}-${flight.arrival.city}`, {
      state: { flight },
    });
  };

  return (
    <Grid2
      container
      spacing={2}
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#282c34",
        width: "60%",
      }}
    >
      {flights.map((flight, index) => (
        <Grid2 key={index}>
          <Card
            variant='outlined'
            sx={{ height: "100%", backgroundColor: "#444c56" }}
            onClick={() => handleCardClick(flight)}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ flex: 1, textAlign: "left" }}>
                <Typography variant='h6' component='div'>
                  {flight.arrival.city} ({flight.arrival.airport})
                </Typography>
                <Typography color='text.secondary'>
                  Origin: {flight.departure.city} ({flight.departure.airport})
                </Typography>
              </Box>

              <Box sx={{ flex: 0.5, textAlign: "right" }}>
                <Typography color='text.secondary' variant='body2'>
                  Duration: {flight.duration}
                </Typography>
              </Box>

              <Box sx={{ flex: 0.5, textAlign: "center" }}>
                <Typography color='text.secondary' sx={{ marginTop: 1 }}>
                  Total Price: ${flight.totalPrice.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};
