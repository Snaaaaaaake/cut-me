import React, { useState, useContext } from "react";
import { connect, ConnectedProps } from "react-redux";
import { TextField, Typography, Button, Box, FormControl } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ServiceContext from "../Context/ServiceContext";
import { FormRegistrationInitialState as initialState } from "../../store/initialStates";
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

const RegisterForm: React.FC<PropsType> = (props) => {
  const linkService = useContext(ServiceContext)!;
  const classes = useStyles();
  const [formState, setFormState] = useState<ComponentStatesTypes.IFormRegistrationState>({
    ...initialState,
  });
  const { name, password, passwordAgain, email, isLoading, error } = formState;
  const { fetchUserSuccessAction, closeHandler } = props;
  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setFormState({
      ...formState,
      [event.target.id]: event.target.value,
    });
  };

  const onSubmitSignUpHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (event.currentTarget.checkValidity()) {
      if (password !== passwordAgain) {
        setFormState({ ...formState, error: "Пароли не совпадают!" });
      } else {
        setFormState({ ...formState, isLoading: true });
        linkService
          .userSignUp(name, email, password)
          .then((data) => {
            fetchUserSuccessAction(data);
            setFormState({ ...initialState });
            alert("Пользователь создан, вход выполнен");
            closeHandler();
          })
          .catch((e) => setFormState({ ...formState, error: e.message }));
      }
    } else {
      setFormState({
        ...formState,
        error: "Проверьте правильность заполнения формы!",
      });
    }
  };

  return (
    <>
      <Box mt={3}>
        <Typography variant="h6" align="center" component="h5">
          Зарегистрироваться
        </Typography>
      </Box>
      <form className={classes.root} onSubmit={onSubmitSignUpHandler}>
        <FormControl className={classes.formContainer} disabled={isLoading}>
          <TextField
            onChange={onChangeInputHandler}
            id="name"
            label="Имя пользователя"
            helperText="Допускаются буквы и цифры"
            fullWidth
            margin="normal"
            required
            type="text"
            value={name}
            inputProps={{
              pattern: "[а-яА-ЯёЁA-Za-z0-9-_\\s]*",
              minLength: 2,
              maxLength: 25,
            }}
          />
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
            helperText="Минимум шесть символов"
            fullWidth
            margin="normal"
            required
            type="password"
            value={password}
            inputProps={{ pattern: "[^<>s]*", minLength: 6 }}
          />
          <TextField
            onChange={onChangeInputHandler}
            id="passwordAgain"
            label="Повторите пароль"
            fullWidth
            margin="normal"
            required
            type="password"
            value={passwordAgain}
          />

          <Typography style={{ color: "red" }} variant="subtitle1">
            {error}
          </Typography>
          <Box mt={3}>
            <Button disabled={isLoading} type="submit" variant="contained" color="primary">
              Зарегистрироваться
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

export default connector(RegisterForm);
