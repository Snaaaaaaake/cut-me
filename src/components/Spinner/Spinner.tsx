import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

const Spinner: React.FC = () => {
  return (
    <Box p={3} display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
