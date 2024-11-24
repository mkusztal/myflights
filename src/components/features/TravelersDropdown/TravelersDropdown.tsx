import React from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface TravelersDropdownProps {
  adults: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  children: number;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  infantsInSeat: number;
  setInfantsInSeat: React.Dispatch<React.SetStateAction<number>>;
  infantsOnLap: number;
  setInfantsOnLap: React.Dispatch<React.SetStateAction<number>>;
}

export const TravelersDropdown: React.FC<TravelersDropdownProps> = ({
  adults,
  setAdults,
  children,
  setChildren,
  infantsInSeat,
  setInfantsInSeat,
  infantsOnLap,
  setInfantsOnLap,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleIncrement = (
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => setter((prev) => prev + 1);

  const handleDecrement = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    min: number
  ) => setter((prev) => (prev > min ? prev - 1 : prev));

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCancel = () => {
    setAdults(1);
    setChildren(0);
    setInfantsInSeat(0);
    setInfantsOnLap(0);
    handleCloseMenu();
  };

  const handleDone = () => {
    handleCloseMenu();
  };

  const travelers = [
    { label: "Adults", value: adults, setter: setAdults, min: 1 },
    { label: "Children", value: children, setter: setChildren, min: 0 },
    {
      label: "Infants (Seat)",
      value: infantsInSeat,
      setter: setInfantsInSeat,
      min: 0,
    },
    {
      label: "Infants (Lap)",
      value: infantsOnLap,
      setter: setInfantsOnLap,
      min: 0,
    },
  ];

  const totalTravelers = adults + children + infantsInSeat + infantsOnLap;

  return (
    <Box>
      <Button
        onClick={handleOpenMenu}
        sx={{
          backgroundColor: "#444c56",
          color: "white",
          "&:hover": {
            backgroundColor: "#3c96f0",
          },
        }}
      >
        <PersonIcon />: {totalTravelers}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            backgroundColor: "#444c56",
            color: "white",
            padding: 1,
            borderRadius: 2,
          },
        }}
      >
        {travelers.map(({ label, value, setter, min }, index) => (
          <MenuItem key={index} disableRipple>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Typography sx={{ flex: 1 }}>{label}</Typography>
              <IconButton
                color='primary'
                onClick={() => handleDecrement(setter, min)}
                sx={{ color: "white" }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 1 }}>{value}</Typography>
              <IconButton
                color='primary'
                onClick={() => handleIncrement(setter)}
                sx={{ color: "white" }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </MenuItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            paddingBottom: 1,
          }}
        >
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleDone}>Done</Button>
        </Box>
      </Menu>
    </Box>
  );
};
