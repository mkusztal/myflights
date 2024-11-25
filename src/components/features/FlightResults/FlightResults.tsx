import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { Flight } from "../../../interfaces/types";
import { useNavigate } from "react-router-dom";

interface FlightResultsProps {
  flights: Flight[];
  returnFlights: Flight[];
}

export const FlightResults: React.FC<FlightResultsProps> = ({
  flights,
  returnFlights,
}) => {
  const navigate = useNavigate();

  const handleCardClick = (flight: Flight) => {
    navigate(`/flight/${flight.departure.city}-${flight.arrival.city}`, {
      state: { flight },
    });
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#282c34",
        width: "60%",
      }}
    >
      {flights.length > 0 ? (
        flights.map((flight, index) => (
          <Box key={index}>
            <Card
              variant='outlined'
              sx={{
                height: "100%",
                backgroundColor: "#444c56",
                marginBottom: 2,
                cursor: "pointer",
              }}
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

            {flight.tripType === "Both Way" && (
              <Box>
                <Divider sx={{ my: 2 }} />
                {returnFlights.map((returnFlight, returnIndex) => (
                  <Card
                    key={`return-${index}-${returnIndex}`}
                    variant='outlined'
                    sx={{
                      height: "100%",
                      backgroundColor: "#444c56",
                      marginBottom: 2,
                      cursor: "pointer",
                    }}
                    onClick={() => handleCardClick(returnFlight)}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ flex: 1, textAlign: "left" }}>
                        <Typography color='text.secondary'>
                          Origin: {returnFlight.departure.city} (
                          {returnFlight.departure.airport})
                        </Typography>
                        <Typography variant='h6' component='div'>
                          {returnFlight.arrival.city} (
                          {returnFlight.arrival.airport})
                        </Typography>
                      </Box>

                      <Box sx={{ flex: 0.5, textAlign: "right" }}>
                        <Typography color='text.secondary' variant='body2'>
                          Duration: {returnFlight.duration}
                        </Typography>
                      </Box>

                      <Box sx={{ flex: 0.5, textAlign: "center" }}>
                        <Typography
                          color='text.secondary'
                          sx={{ marginTop: 1 }}
                        >
                          Total Price: ${returnFlight.totalPrice.toFixed(2)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        ))
      ) : (
        <Box>
          <Typography color='text.secondary' sx={{ textAlign: "center" }}>
            No flights found.
          </Typography>
        </Box>
      )}
    </Box>
  );
};
