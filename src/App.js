import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "./App.css";
import store from "./store/store";
import { Accordion, AccordionDetails, AccordionSummary, Divider, Link } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Margin } from "@mui/icons-material";

function App() {
  const [activeStep, setActiveStep] = React.useState(Number(localStorage.getItem("activeStep") || 0));

  const handleNext = (current) => {
    setActiveStep(current + 1);
    localStorage.setItem("activeStep", current + 1)
  };

  const handleBack = (current) => {
    setActiveStep(current - 1);
    localStorage.setItem("activeStep", current - 1)
  };

  const handleReset = () => {
    setActiveStep(0);
    localStorage.setItem("activeStep", 0)
  };

  return (
    <>
      <Box sx={{ maxWidth: "100%", padding: 2 }}>
        <Typography variant="h5">Маршрут</Typography>
        <Link
          href={store.commonLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ссылка на карту
        </Link>
        <Stepper sx={{marginTop: 6}} activeStep={activeStep} orientation="vertical">
          {store.steps.map((step, index) => (
            <Step key={`step-${step.index}`}>
              <StepLabel
                optional={
                  index === store.steps.length - 1 ? (
                    <Typography variant="caption">Последнее место</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Link
                  href={step.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ссылка на карту
                </Link>
                <Typography >{step.way}</Typography>

                <Divider />
                <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography component="span">Описание</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {step.description?.map((dsc, dscIndex) => {
                          return (
                            <Box key={`descr-${dscIndex}`}>
                              <Typography variant="h6">{dsc.name}</Typography>
                              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                {dsc.txt?.map((txt, txtIndex) => {
                                  return (
                                    <Typography key={`descr-${dscIndex}-${txtIndex}`}>{txt}</Typography>
                                  )
                                })}
                              </Box>
                            </Box>
                          )
                        })}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleNext(activeStep)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === store.steps.length - 1 ? "Закончить" : "Продолжить"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={() => handleBack(activeStep)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Назад
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === store.steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Маршрут окончен</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }} variant="contained">
              Сбросить
            </Button>
          </Paper>
        )}
      </Box>
    </>
  );
}

export default App;
