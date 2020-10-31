import React, { useState, useContext } from "react";
import { connect, ConnectedProps } from "react-redux";
import { TextField, Typography, Button, Box, FormControl } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ServiceContext from "../Context/ServiceContext";
import { FormLoginInitialState as initialState } from "../../store/initialStates";
import { ComponentStatesTypes } from "../../types/reduxTypes";
import { fetchUserSuccessAction } from "../../actions/action";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      border: "none",
    },
    formContainer: {
      padding: "15px",
      display: "flex",
      flexWrap: "wrap",
      border: "none",
    },
  })
);

type PropsType = PropsFromRedux & {
  closeHandler: () => void;
};

const LoginForm: React.FC<PropsType> = (props) => {
  const linkService = useContext(ServiceContext)!;
  const classes = useStyles();
  const [formState, setFormState] = useState<ComponentStatesTypes.IFormLoginState>({
    ...initialState,
  });
  const { password, email, isLoading, error } = formState;
  const { fetchUserSuccessAction, closeHandler } = props;

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setFormState({
      ...formState,
      [event.target.id]: event.target.value,
    });
  };

  const onSubmitSignInHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.checkValidity()) {
      setFormState({ ...formState, isLoading: true });
      linkService
        .userSignIn(password, email)
        .then((data) => {
          fetchUserSuccessAction(data);
          setFormState({ ...initialState });
          alert("Вход выполнен успешно!");
          closeHandler();
        })
        .catch((e) => setFormState({ ...formState, error: e.message }));
    } else {
      setFormState({
        ...formState,
        error: "Проверьте правильность заполнения формы!",
      });
    }
  };

  return (
    <>
      <Box mt={2}>
        <Typography variant="h6" align="center" component="h5">
          Войти
        </Typography>
      </Box>

      <form className={classes.root} onSubmit={onSubmitSignInHandler}>
        <FormControl className={classes.formContainer} disabled={isLoading}>
          <TextField
            onChange={onChangeInputHandler}
            id="email"
            label="Email"
            helperText="Электронная почта"
            fullWidth
            margin="normal"
            required
            type="email"
            value={email}
          />
          <TextField
            onChange={onChangeInputHandler}
            id="password"
            label="Пароль"
            fullWidth
            margin="normal"
            required
            type="password"
            value={password}
          />
          <Typography style={{ color: "red" }} variant="subtitle1">
            {error}
          </Typography>
          <Box mt={3}>
            <Button disabled={isLoading} type="submit" variant="contained" color="primary">
              Войти
            </Button>
          </Box>
        </FormControl>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  fetchUserSuccessAction,
};

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LoginForm);
