import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Layout from "../Layout/Layout";
import Head from "../Head/Head";
import TableComponent from "../TableComponent/TableComponent";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      margin: "10px",
    },
  })
);

const LinksPage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Head>
        <Typography variant="h3" className={classes.title} align="center" component="h1">
          Список ваших ссылок
        </Typography>
      </Head>
      <Layout>
        <TableComponent />
      </Layout>
    </>
  );
};

export default LinksPage;
