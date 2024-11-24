import React, { useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Flight } from "../../../interfaces/types";
import { TravelersDropdown } from "../TravelersDropdown/TravelersDropdown";

interface SingleFlightProps {
  flight: Flight;
}

export const SingleFlight: React.FC<SingleFlightProps> = ({ flight }) => {
  const [adults, setAdults] = useState(flight.people.adults);
  const [children, setChildren] = useState(flight.people.children);
  const [infantsInSeat, setInfantsInSeat] = useState(
    flight.people.infantsInSeat
  );
  const [infantsOnLap, setInfantsOnLap] = useState(flight.people.infantsOnLap);

  if (!flight) {
    throw new Error("No data for flight");
  }

  const totalPeople = adults + children + infantsInSeat + infantsOnLap;
  const totalPrice = flight.price * totalPeople;

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#282c34",
        padding: 2,
      }}
    >
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Typography variant='h4' color='white' align='left'>
          {flight.departure.city} → {flight.arrival.city}
        </Typography>
        <Typography
          sx={{
            marginTop: 2,
            fontWeight: "bold",
          }}
          color='white'
          variant='h5'
        >
          €{totalPrice.toFixed(2)}
        </Typography>
      </Box>

      <Typography
        variant='h6'
        color='white'
        align='left'
        display='flex'
        flexDirection='row'
        gap={2}
        marginBottom='1rem'
      >
        {flight.tripType} - {flight.class} - {flight.totalPeople}{" "}
        {
          <TravelersDropdown
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
            infantsInSeat={infantsInSeat}
            setInfantsInSeat={setInfantsInSeat}
            infantsOnLap={infantsOnLap}
            setInfantsOnLap={setInfantsOnLap}
          />
        }
      </Typography>
      <Card
        variant='elevation'
        sx={{
          backgroundColor: "#282c34",
          border: "2px solid white",
          color: "#fff",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant='h6'
            sx={{
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {`${formatDate(flight.departure.time)} -
            ${new Date(flight.departure.time).toLocaleTimeString()} -
            ${new Date(flight.arrival.time).toLocaleTimeString()}`}
          </Typography>
          <Typography variant='h6' sx={{ marginTop: 1 }}></Typography>

          <Typography sx={{ marginTop: 2 }}>
            Travel Class: {flight.class}
          </Typography>

          <Typography sx={{ marginTop: 2 }}>
            Price per Person: {flight.price.toFixed(2)} €
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
