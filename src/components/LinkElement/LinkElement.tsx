import React, { useContext, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TableRow, TableCell, Typography, Button, Checkbox, TextField, Box } from "@material-ui/core";
import ServiceContext from "../Context/ServiceContext";
import { ServiceTypes } from "../../types/appTypes";
import { StoreStatesTypes } from "../../types/reduxTypes";
import { FormEditLinkInitialState as initialState } from "../../store/initialStates";
import { fetchLinksSuccessAction, fetchLinksFailureAction } from "../../actions/action";
import siteUrl from "../../constants/siteUrl";
import dateFormatter from "../../utils/dateFormatter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      padding: 0,
      textTransform: "none",
      color: theme.palette.text.secondary,
      fontWeight: "normal",
    },
  })
);

type PropsType = PropsFromRedux & {
  link: ServiceTypes.IServerResponseLink;
  checkboxHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checkboxIsChecked: boolean;
};

const LinkElement: React.FC<PropsType> = (props) => {
  const linkService = useContext(ServiceContext)!;
  const classes = useStyles();
  const [formState, setFormState] = useState({ ...initialState });
  const { isEditing, editValue, isLoading } = formState;
  const {
    userState: { user },
    link: { _id, url, title, counter, date, hash },
    checkboxIsChecked,
    checkboxHandler,
    fetchLinksSuccessAction,
    fetchLinksFailureAction,
  } = props;
  const hashedLink = `${siteUrl}/${hash}`;
  const windowWidth = document.documentElement.clientWidth;

  const removeButtonHandler = (): void => {
    const isConfirmed: boolean = window.confirm("Подтвердить удаление?");
    if (isConfirmed) {
      setFormState({ ...initialState, isLoading: true });
      linkService
        .removeLink(_id)
        .then(() =>
          linkService.getLinks(user!._id).then((data) => {
            return fetchLinksSuccessAction(data);
          })
        )
        .catch(fetchLinksFailureAction);
    }
  };

  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormState({
      ...initialState,
      isEditing: true,
      editValue: event.target.value,
    });
  };

  const editButtonHandler = (): void => {
    setFormState({ ...initialState, isEditing: !isEditing });
  };

  const submitFormHandler = (): void => {
    setFormState({ ...initialState, isLoading: true });
    linkService
      .editLink(_id, editValue)
      .then(() =>
        linkService.getLinks(user!._id).then((data) => {
          fetchLinksSuccessAction(data);
          setFormState({ ...initialState });
        })
      )
      .catch(fetchLinksFailureAction);
  };

  const copyLinkHandler = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const elem = document.createElement("input");
    elem.value = hashedLink;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand("copy");
    event.currentTarget.textContent = "Скопировано!";
    document.body.removeChild(elem);
  };

  const EditFormElement: JSX.Element = (
    <form onSubmit={submitFormHandler}>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        <TextField
          autoFocus
          value={editValue}
          onChange={changeInputHandler}
          id="email"
          placeholder="Введите название"
          margin="normal"
          type="text"
          inputProps={{ pattern: "[а-яА-ЯёЁA-Za-z0-9-_\\s]*" }}
          variant="outlined"
          size="small"
        />

        <Box p={1}>
          <Button type="submit" size="small" color="primary">
            Ок
          </Button>
          <Button onClick={editButtonHandler} size="small" color="secondary">
            Отмена
          </Button>
        </Box>
      </Box>
    </form>
  );

  return (
    <TableRow>
      {isLoading ? (
        <TableCell colSpan={5}> ...Загрузка</TableCell>
      ) : (
        <>
          <TableCell padding="none">
            <Checkbox checked={checkboxIsChecked} onChange={checkboxHandler} id={_id} color="default" />
          </TableCell>
          <TableCell padding="none">
            <Typography title={url} variant="body1" component="div">
              {url.length > 30 ? `${url.slice(0, 30)}...` : url}
            </Typography>
            <Button className={classes.link} title="Скопировать" color="default" onClick={copyLinkHandler}>
              {hashedLink}
            </Button>
            <Typography color="textPrimary" variant="body2" component="div">
              {!isEditing ? title : EditFormElement}
            </Typography>
          </TableCell>
          {windowWidth >= 768 && (
            <>
              <TableCell>{counter}</TableCell>
              <TableCell padding="none">{dateFormatter(date)}</TableCell>
              <TableCell padding="none">
                <Button title="Редактировать название" color="primary" onClick={editButtonHandler}>
                  &#9998;
                </Button>
                <Button title="Удалить" color="secondary" onClick={removeButtonHandler}>
                  &#10006;
                </Button>
              </TableCell>
            </>
          )}
        </>
      )}
    </TableRow>
  );
};

const mapStateToProps = (store: StoreStatesTypes.StoreStateType) => ({
  userState: store.userState,
});
const mapDispatchToProps = {
  fetchLinksSuccessAction,
  fetchLinksFailureAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(LinkElement);
