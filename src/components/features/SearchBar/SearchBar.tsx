import React, { useState } from "react";
import { Box, Container, TextField, Button, Grid2 } from "@mui/material";
import { FilterBar } from "../FilterBar/FilterBar";

interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  tripType: "One Way" | "Both Way";
  people: {
    adults: number;
    children: number;
    infantsInSeat: number;
    infantsOnLap: number;
  };
  travelClass: "Economy" | "Business" | "First" | "Premium Business";
}

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState<"One Way" | "Both Way">("One Way");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infantsInSeat, setInfantsInSeat] = useState(0);
  const [infantsOnLap, setInfantsOnLap] = useState(0);
  const [travelClass, setTravelClass] = useState<
    "Economy" | "Business" | "First" | "Premium Business"
  >("Economy");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      origin,
      destination,
      departureDate,
      returnDate,
      tripType,
      people: {
        adults,
        children,
        infantsInSeat,
        infantsOnLap,
      },
      travelClass,
    });
  };

  return (
    <Box
      component='form'
      onSubmit={handleSearch}
      sx={{
        marginTop: 4,
        backgroundColor: "#444c56",
        padding: 4,
        borderRadius: 2,
        color: "white",
      }}
    >
      <Container>
        <FilterBar
          tripType={tripType}
          setTripType={setTripType}
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          infantsInSeat={infantsInSeat}
          setInfantsInSeat={setInfantsInSeat}
          infantsOnLap={infantsOnLap}
          setInfantsOnLap={setInfantsOnLap}
          travelClass={travelClass}
          setTravelClass={setTravelClass}
        />

        <Grid2 container spacing={2} alignItems='center'>
          <Grid2>
            <TextField
              label='From'
              variant='outlined'
              fullWidth
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
              sx={{ backgroundColor: "#444c56", borderRadius: 2 }}
              InputProps={{ style: { color: "white" } }}
            />
          </Grid2>

          <Grid2>
            <Button
              variant='contained'
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#3c96f0" },
                height: "56px",
              }}
              onClick={() => {
                const temp = origin;
                setOrigin(destination);
                setDestination(temp);
              }}
            >
              ↔
            </Button>
          </Grid2>

          <Grid2>
            <TextField
              label='To'
              variant='outlined'
              fullWidth
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              sx={{ backgroundColor: "#444c56", borderRadius: 2 }}
              InputProps={{ style: { color: "white" } }}
            />
          </Grid2>

          <Grid2>
            <TextField
              label='Departure Date'
              type='date'
              fullWidth
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              sx={{ backgroundColor: "#444c56", borderRadius: 2 }}
              InputProps={{ style: { color: "white" } }}
            />
          </Grid2>

          <Grid2>
            <TextField
              label='Return Date'
              type='date'
              fullWidth
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              disabled={tripType === "One Way"}
              sx={{ backgroundColor: "#444c56", borderRadius: 2 }}
              InputProps={{ style: { color: "white" } }}
            />
          </Grid2>

          <Grid2>
            <Button
              type='submit'
              variant='contained'
              fullWidth
              sx={{
                padding: "0.8rem",
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#3c96f0" },
              }}
            >
              Search Flights
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};
