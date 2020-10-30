import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";
import Layout from "../Layout/Layout";
import Head from "../Head/Head";
import AddLinkForm from "../AddLinkForm/AddLinkForm";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      margin: "10px",
    },
  })
);

const MainPage: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Head>
        <Container maxWidth="lg">
          <Typography variant="h3" className={classes.title} align="center" component="h1">
            Сократитель ссылок
          </Typography>
          <Typography variant="body1" className={classes.title} align="center">
            Сервис предназначен для сокращения длинных ссылок. Есть возможность завести аккаунт и отслеживать
            в нём активность ссылок. Это тренировочный проект, поэтому всё условно ;)
          </Typography>
        </Container>
      </Head>
      <Layout>
        <AddLinkForm />
      </Layout>
    </>
  );
};

export default MainPage;
