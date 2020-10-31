import React from "react";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Box } from "@material-ui/core";
import Head from "../Head/Head";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      margin: "10px",
    },
  })
);

const NotFoundPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Head>
      <>
        <Typography variant="h3" className={classes.title} align="center" component="h1">
          Ничего не найдено!
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button onClick={() => history.push("/")} color="primary" variant="contained">
            На главную
          </Button>
        </Box>
      </>
    </Head>
  );
};

export default NotFoundPage;
