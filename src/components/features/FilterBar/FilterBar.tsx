import {
  Box,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { TravelersDropdown } from "../TravelersDropdown/TravelersDropdown";

interface FilterBarProps {
  tripType: "One Way" | "Both Way";
  setTripType: React.Dispatch<React.SetStateAction<"One Way" | "Both Way">>;
  adults: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  children: number;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  infantsInSeat: number;
  setInfantsInSeat: React.Dispatch<React.SetStateAction<number>>;
  infantsOnLap: number;
  setInfantsOnLap: React.Dispatch<React.SetStateAction<number>>;
  travelClass: "Economy" | "Business" | "First" | "Premium Business";
  setTravelClass: React.Dispatch<
    React.SetStateAction<"Economy" | "Business" | "First" | "Premium Business">
  >;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  tripType,
  setTripType,
  adults,
  setAdults,
  children,
  setChildren,
  infantsInSeat,
  setInfantsInSeat,
  infantsOnLap,
  setInfantsOnLap,
  travelClass,
  setTravelClass,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        marginBottom: "0.5rem",
        gap: 2,
      }}
    >
      <Grid2>
        <FormControl fullWidth>
          <InputLabel sx={{ color: "white" }}>Trip Type</InputLabel>
          <Select
            value={tripType}
            onChange={(e) =>
              setTripType(e.target.value as "One Way" | "Both Way")
            }
            sx={{
              backgroundColor: "#444c56",
              borderRadius: 2,
              color: "white",
            }}
          >
            <MenuItem value='One Way'>One Way</MenuItem>
            <MenuItem value='Both Way'>Both Way</MenuItem>
          </Select>
        </FormControl>
      </Grid2>

      <Grid2>
        <FormControl fullWidth>
          <InputLabel sx={{ color: "white" }}>Class</InputLabel>
          <Select
            value={travelClass}
            onChange={(e) =>
              setTravelClass(
                e.target.value as
                  | "Economy"
                  | "Business"
                  | "First"
                  | "Premium Business"
              )
            }
            sx={{
              backgroundColor: "#444c56",
              borderRadius: 2,
              color: "white",
            }}
          >
            <MenuItem value='Economy'>Economy</MenuItem>
            <MenuItem value='Business'>Business</MenuItem>
            <MenuItem value='First'>First</MenuItem>
            <MenuItem value='Premium Business'>Premium Business</MenuItem>
          </Select>
        </FormControl>
      </Grid2>

      <Grid2>
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
      </Grid2>
    </Box>
  );
};
