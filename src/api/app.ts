import axios from "axios";
import { Airport, Flight } from "../interfaces/types";

const BASE_URL = "https://sky-scrapper.p.rapidapi.com/api/v1/flights";
const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

if (!API_KEY) {
  throw new Error(
    "REACT_APP_RAPIDAPI_KEY is not defined. Check your .env file."
  );
}

const headers = {
  "X-RapidAPI-KEY": API_KEY as string,
  "X-RapidAPI-HOST": "sky-scrapper.p.rapidapi.com",
};

export const getNearbyAirports = async (
  latitude: number,
  longitude: string
): Promise<Airport[]> => {
  const response = await axios.get(`${BASE_URL}/getNearByAirports`, {
    headers,
    params: { latitude, longitude },
  });
  return response.data.data;
};

export const searchAirport = async (query: string): Promise<Airport[]> => {
  const response = await axios.get(`${BASE_URL}/searchAirport`, {
    headers,
    params: { query },
  });
  return response.data.data;
};

export const searchFlight = async (params: {
  originSkyId: string;
  destinationSkyId: string;
  date: string;
}): Promise<Flight[]> => {
  const response = await axios.get(`${BASE_URL}/searchFlights`, {
    headers,
    params,
  });
  return response.data.data;
};
