import React, { useContext } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Button, Typography } from "@material-ui/core";
import ServiceContext from "../Context/ServiceContext";
import { StoreStatesTypes } from "../../types/reduxTypes";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Spinner from "../Spinner/Spinner";
import { fetchUserRequestAction, fetchUserSuccessAction, fetchUserFailureAction } from "../../actions/action";

type PropsType = PropsFromRedux & {
  closeHandler: () => void;
};

const MainPage: React.FC<PropsType> = (props) => {
  const history = useHistory();
  const linkService = useContext(ServiceContext)!;
  const {
    fetchUserRequestAction,
    fetchUserSuccessAction,
    fetchUserFailureAction,
    closeHandler,
    userState: { user, error, isLoading },
  } = props;

  const logOutHandler = (): void => {
    fetchUserRequestAction();
    linkService
      .userSignOut()
      .then(() => {
        fetchUserSuccessAction(null);
        alert("Вы вышли из своего аккаунта");
        closeHandler();
        history.push("/");
      })
      .catch(fetchUserFailureAction);
  };

  if (error) {
    return <ErrorComponent error={error} />;
  } else if (isLoading) {
    return <Spinner />;
  } else if (user) {
    return (
      <>
        <Box p={2}>
          <Typography variant="h6" component="h5">
            Пользователь
          </Typography>
        </Box>
        <Box p={2}>
          <Typography variant="body1" component="p">
            Имя: {user.name}
          </Typography>
          <Typography variant="body1" component="p">
            Почта: {user.email}
          </Typography>
        </Box>
        <Box p={2} display="flex" justifyContent="center">
          <Button onClick={logOutHandler} variant="contained" color="primary">
            Выйти
          </Button>
        </Box>
      </>
    );
  } else {
    return <Box p={2}>Требуется регистрация</Box>;
  }
};
const mapStateToProps = (state: StoreStatesTypes.StoreStateType) => ({
  userState: state.userState,
});
const mapDispatchToProps = {
  fetchUserRequestAction,
  fetchUserSuccessAction,
  fetchUserFailureAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MainPage);
