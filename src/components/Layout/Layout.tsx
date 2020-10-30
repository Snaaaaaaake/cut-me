import React from "react";
import { Container, Paper } from "@material-ui/core";
import { LayoutPropsType } from "../../types/appTypes";

const Layout: React.FC<LayoutPropsType> = (props) => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3}>{props.children}</Paper>
    </Container>
  );
};

export default Layout;
