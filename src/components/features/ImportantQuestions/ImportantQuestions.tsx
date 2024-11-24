import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { qa } from "../../../utils/context";

export const ImportantQuestions: React.FC = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9",
      },
      background: {
        paper: "#2d3436",
        default: "#1e272e",
      },
      text: {
        primary: "#ffffff",
        secondary: "#b2bec3",
      },
    },
    typography: {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          padding: 3,
          width: { xs: "95%", sm: "80%", md: "60%" },
          margin: "0 auto",
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant='h5'
          gutterBottom
          sx={{ textAlign: "center", color: "text.primary" }}
        >
          Frequently Asked Questions
        </Typography>

        {qa.map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              marginBottom: 2,
              backgroundColor: "background.default",
              color: "text.primary",
              borderRadius: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore sx={{ color: "text.primary" }} />}
              sx={{
                "& .MuiAccordionSummary-content": { justifyContent: "center" },
              }}
            >
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ textAlign: "left", color: "text.secondary" }}>
                {faq.answer.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </ThemeProvider>
  );
};
