import React, { useState, useContext } from "react";
import { connect, ConnectedProps } from "react-redux";
import ServiceContext from "../Context/ServiceContext";
import { ComponentStatesTypes } from "../../types/reduxTypes";
import { FormAddLinkInitialState } from "../../store/initialStates";
import { StoreStatesTypes } from "../../types/reduxTypes";
import siteUrl from "../../constants/siteUrl";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import { TextField, Typography, Button, Box, FormControl } from "@material-ui/core";

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
    copyLinkElements: {
      margin: "5px",
    },
  })
);

const AddLinkForm: React.FC<PropsFromRedux> = (props) => {
  const linkService = useContext(ServiceContext)!;
  const classes = useStyles();
  const [formState, setFormState] = useState<ComponentStatesTypes.IFormAddlinkState>({
    ...FormAddLinkInitialState,
  });
  let inputRef: HTMLInputElement;
  const { url, title, short, error, isLoading, link } = formState;
  const owner = props.userState.user ? props.userState.user._id : null;

  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setFormState({
      ...formState,
      [event.target.id]: event.target.value,
    });
  };

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (event.currentTarget.checkValidity()) {
      setFormState({ ...formState, isLoading: true });
      linkService
        .addLink(url, owner, title, short.toLowerCase())
        .then((data) => {
          setFormState({
            ...FormAddLinkInitialState,
            link: `${siteUrl}/${data[0].hash}`,
          });
        })
        .catch((e) => setFormState({ ...formState, isLoading: false, error: e.message }));
    } else {
      setFormState({
        ...formState,
        error: "Проверьте правильность заполнения формы!",
      });
    }
  };

  const copyButtonHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
    inputRef.select();
    document.execCommand("copy");
    event.currentTarget.textContent = "Скопировано!";
  };

  return (
    <>
      {link && (
        <Box pt={3} pb={2} display="flex" justifyContent="center" flexWrap="wrap">
          <TextField
            label="Ваша ссылка"
            inputProps={{ readOnly: true }}
            value={link}
            inputRef={(e) => (inputRef = e)}
            variant="outlined"
            size="small"
            className={classes.copyLinkElements}
          />
          <Button
            onClick={copyButtonHandler}
            variant="contained"
            color="secondary"
            className={classes.copyLinkElements}
          >
            Скопировать
          </Button>
        </Box>
      )}
      <form className={classes.root} onSubmit={submitFormHandler}>
        <FormControl className={classes.formContainer} disabled={isLoading}>
          <TextField
            onChange={changeInputHandler}
            id="url"
            label="Ссылка"
            helperText="Ссылка, которую вы хотите сократить"
            fullWidth
            margin="normal"
            required
            size="medium"
            type="text"
            value={url}
            inputProps={{ pattern: "http[^<>]*" }}
          />
          <TextField
            onChange={changeInputHandler}
            id="title"
            label="Название"
            helperText="Название, которое вы будете видеть в своём аккаунте"
            fullWidth
            margin="normal"
            type="text"
            size="small"
            value={title}
            inputProps={{ pattern: "[а-яА-ЯёЁA-Za-z0-9-_\\s]*" }}
          />
          <TextField
            onChange={changeInputHandler}
            id="short"
            label="Сокращенный текст"
            helperText="Будет добавлен в сокращенную версию ссылки, допускаются латинские
            буквы и цифры"
            fullWidth
            size="small"
            margin="normal"
            type="text"
            value={short}
            inputProps={{ pattern: "[A-Za-z0-9]*" }}
          />
          <Typography style={{ color: "red" }} variant="subtitle1">
            {error}
          </Typography>

          <Box mt={3}>
            <Button disabled={isLoading} type="submit" variant="contained" color="primary">
              Добавить
            </Button>
          </Box>
        </FormControl>
      </form>
    </>
  );
};

const mapStateToProps = (state: StoreStatesTypes.StoreStateType) => ({
  userState: state.userState,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddLinkForm);
