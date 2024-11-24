import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { SingleFlight } from "../features/SingleFlight/SingleFlight";
import { Flight } from "../../interfaces/types";

export const SingleFlightPage: React.FC = () => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const flight = location.state?.flight as Flight;

  if (!flight) {
    return (
      <div>
        <h2>No flight details available</h2>
        <p>The flight ID provided was: {id}</p>
      </div>
    );
  }

  return (
    <div>
      <SingleFlight flight={flight} />
    </div>
  );
};
