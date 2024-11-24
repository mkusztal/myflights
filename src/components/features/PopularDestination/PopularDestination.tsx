import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Grid2 } from "@mui/material";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { destination } from "../../../utils/context";

export const PopularDestination: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState({
    lat: 53.54992,
    lng: 10.00678,
  });
  const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const googleMapId = process.env.REACT_APP_MAP_ID;

  if (!googleMapApiKey) {
    throw new Error(
      "REACT_APP_GOOGLE_MAPS_API_KEY is not defined. Check your .env file."
    );
  }

  if (!googleMapId) {
    throw new Error("REACT_APP_MAP_ID is not defined. Check your .env file.");
  }

  const handleDestinationClick = (position: { lat: number; lng: number }) => {
    setSelectedPosition(position);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant='h5' gutterBottom>
        Popular Destinations from Helsinki
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 4, marginTop: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Grid2 container direction='column' spacing={2}>
            {destination.map((dest, index) => (
              <Grid2 key={index}>
                <Typography
                  sx={{
                    cursor: "pointer",
                    color: "white",
                    textDecoration: "underline",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={() => handleDestinationClick(dest.position)}
                >
                  {`To ${dest.name}`}
                </Typography>
              </Grid2>
            ))}
          </Grid2>
        </Box>

        <Box sx={{ flex: 1 }}>
          <APIProvider apiKey={googleMapApiKey}>
            <Map
              mapId={googleMapId}
              center={selectedPosition}
              zoom={5}
              style={{ width: "500px", height: "500px" }}
            >
              <AdvancedMarker position={selectedPosition} />
            </Map>
          </APIProvider>
        </Box>
      </Box>
    </Box>
  );
};
