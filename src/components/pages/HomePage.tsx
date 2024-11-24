import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SearchBar } from "../features/SearchBar/SearchBar";
import { FlightResults } from "../features/FlightResults/FlightResults";
import { Flight } from "../../interfaces/types";
import { PopularDestination } from "../features/PopularDestination/PopularDestination";
import { ImportantQuestions } from "../features/ImportantQuestions/ImportantQuestions";
import data from "../../utils/mock_data.json";

export const HomePage: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const flightsValidation = !loading && !error && flights.length > 0;

  const handleSearch = (params: {
    origin: string;
    destination: string;
    travelClass: string;
    people: {
      adults: number;
      children: number;
      infantsInSeat: number;
      infantsOnLap: number;
    };
    tripType: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const flightsData: Flight[] = data.map((flight) => ({
        flight_id: flight.flight_id,
        airline: flight.airline,
        price: flight.price,
        departure: {
          city: flight.departure.city,
          airport: flight.departure.airport,
          time: new Date(flight.departure.time),
        },
        arrival: {
          city: flight.arrival.city,
          airport: flight.arrival.airport,
          time: new Date(flight.arrival.time),
        },
        people: {
          adults: 1,
          children: 0,
          infantsInSeat: 0,
          infantsOnLap: 0,
        },
        duration: flight.duration,
        class: params.travelClass,
        totalPrice: 0,
        totalPeople: 0,
        tripType: "",
      }));

      const filteredData = flightsData.filter((flight) => {
        const matchesOrigin =
          flight.departure.city.toLowerCase() === params.origin.toLowerCase();
        const matchesDestination =
          flight.arrival.city.toLowerCase() ===
          params.destination.toLowerCase();
        const matchesClass = flight.class.includes(params.travelClass);

        return matchesOrigin && matchesDestination && matchesClass;
      });

      const totalPeople =
        params.people.adults +
        params.people.children +
        params.people.infantsInSeat +
        params.people.infantsOnLap;

      const results = filteredData.map((flight) => ({
        ...flight,
        totalPrice: flight.price * totalPeople,
        totalPeople: totalPeople,
        tripType: params.tripType,
      }));

      setFlights(results);
    } catch (error) {
      console.error("Error fetching flights: ", error);
      setError("Failed to fetch flights. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <Typography variant='h3' component='h1'>
        Find Your Flight
      </Typography>
      <SearchBar
        onSearch={(params) => {
          handleSearch({
            origin: params.origin,
            destination: params.destination,
            travelClass: params.travelClass,
            people: params.people,
            tripType: params.tripType,
          });
        }}
      />

      {flightsValidation && <FlightResults flights={flights} />}

      {loading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity='error' sx={{ marginTop: "1rem" }}>
          {error}
        </Alert>
      )}

      <Divider sx={{ my: 4 }} />

      {flights.length === 0 && <PopularDestination />}

      <Divider sx={{ my: 4 }} />

      <ImportantQuestions />

      <Divider sx={{ my: 4 }} />
    </Box>
  );
};
