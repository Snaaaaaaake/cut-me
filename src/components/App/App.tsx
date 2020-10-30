import React, { useEffect, useContext } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Route, Switch } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import LinksPage from "../LinksPage/LinksPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { fetchUserRequestAction, fetchUserSuccessAction } from "../../actions/action";
import ServiceContext from "../Context/ServiceContext";

const App: React.FC<PropsFromRedux> = (props) => {
  const linkSrvice = useContext(ServiceContext)!;
  const { fetchUserRequestAction, fetchUserSuccessAction } = props;
  // Первичная загрузка пользователя
  useEffect(() => {
    fetchUserRequestAction();
    linkSrvice
      .getUser()
      .then(fetchUserSuccessAction)
      .catch(() => fetchUserSuccessAction(null));
  }, []);

  return (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/user/links" exact component={LinksPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

const mapDispatchToProps = {
  fetchUserRequestAction,
  fetchUserSuccessAction,
};

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
