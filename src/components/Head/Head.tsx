import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { Box, Button, Modal, Paper } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { StoreStatesTypes } from "../../types/reduxTypes";
import { LayoutPropsType } from "../../types/appTypes";
import { ModalStateInitialState as initialState } from "../../store/initialStates";
import Spinner from "../Spinner/Spinner";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import UserCard from "../UserCard/UserCard";

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: "grid",
      alignItems: "center",
      justifyContent: "center",
      overflowY: "auto",
    },
    modalContainer: {
      position: "relative",
    },
    modalCloseButton: {
      position: "absolute",
      top: "0px",
      right: "-15px",
      borderRadius: "50px",
    },
  })
);

type PropsType = PropsFromRedux & LayoutPropsType;

const Head: React.FC<PropsType> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [modalState, setModalState] = useState({
    ...initialState,
  });
  const { isModalOpened, modalContent } = modalState;
  const { user, isLoading, error } = props.userState;

  const handleModalOpen = (element: JSX.Element): React.MouseEventHandler => (): void => {
    setModalState({ isModalOpened: true, modalContent: element });
  };

  const handleModalClose = (): void => {
    setModalState({ ...initialState });
  };

  const UserComponent: React.FC = () =>
    isLoading ? (
      <Spinner />
    ) : error ? (
      <ErrorComponent error={error} />
    ) : user ? (
      <>
        {location.pathname.includes("user/links") ? (
          <Button onClick={() => history.push("/")} color="primary">
            На главную
          </Button>
        ) : (
          <Button onClick={() => history.push("/user/links")} color="primary">
            Мои ссылки
          </Button>
        )}
        <Button onClick={handleModalOpen(<UserCard closeHandler={handleModalClose} />)} color="primary">
          Мой профиль
        </Button>
      </>
    ) : (
      <>
        <Button onClick={handleModalOpen(<LoginForm closeHandler={handleModalClose} />)} color="primary">
          Войти
        </Button>
        <Button onClick={handleModalOpen(<RegisterForm closeHandler={handleModalClose} />)} color="primary">
          Зарегистрироваться
        </Button>
      </>
    );
  return (
    <>
      <Box p={1} display="flex" justifyContent="flex-end" flexWrap="wrap">
        <UserComponent />
      </Box>
      <Box mb={5}>{props.children}</Box>
      <Modal
        disableAutoFocus={true}
        disableEnforceFocus={true}
        className={classes.modal}
        open={isModalOpened}
        onClose={handleModalClose}
      >
        <Paper className={classes.modalContainer} elevation={2}>
          <Button
            className={classes.modalCloseButton}
            size="small"
            title="Закрыть"
            onClick={handleModalClose}
            color="primary"
          >
            X
          </Button>
          {modalContent}
        </Paper>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: StoreStatesTypes.StoreStateType) => ({
  userState: state.userState,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Head);
