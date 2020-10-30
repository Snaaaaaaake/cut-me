import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
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
  return (
    <Head>
      <Typography variant="h3" className={classes.title} align="center" component="h1">
        Ничего не найдено!
      </Typography>
    </Head>
  );
};

export default NotFoundPage;
