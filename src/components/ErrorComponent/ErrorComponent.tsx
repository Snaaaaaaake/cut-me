import React from "react";
import { Box, Typography } from "@material-ui/core";

type PropsType = {
  error: Error;
};

const ErrorComponent: React.FC<PropsType> = (props) => {
  const { error } = props;
  return (
    <Box p={4} style={{ color: "red" }}>
      <Typography variant="body1" component="p">
        {error.message}
      </Typography>
    </Box>
  );
};

export default ErrorComponent;
