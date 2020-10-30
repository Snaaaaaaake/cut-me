import React, { useEffect, useContext, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  Box,
  Typography,
} from "@material-ui/core";
import { StoreStatesTypes } from "../../types/reduxTypes";
import ServiceContext from "../Context/ServiceContext";
import {
  fetchLinksRequestAction,
  fetchLinksSuccessAction,
  fetchLinksFailureAction,
} from "../../actions/action";
import Spinner from "../Spinner/Spinner";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import LinkElement from "../LinkElement/LinkElement";
import { initialFilterState as initialState } from "../../store/initialStates";
import { ServiceTypes } from "../../types/appTypes";

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      padding: 0,
    },
  })
);

const TableComponent: React.FC<PropsFromRedux> = (props) => {
  const linkService = useContext(ServiceContext)!;
  const classes = useStyles();
  const [formCheckboxState, setFormCheckboxState] = useState<string[]>([]);
  const [sorterState, setSorterState] = useState({
    ...initialState,
  });
  const { sorterType, isAscending } = sorterState;
  const {
    fetchLinksRequestAction,
    fetchLinksSuccessAction,
    fetchLinksFailureAction,
    userState: { user },
    linksState: { links, error, isLoading },
  } = props;
  const allCheckboxesAreChecked = links.length === formCheckboxState.length;
  const windowWidth = document.documentElement.clientWidth;

  const sortedLinks = links.sort((a, b) => {
    function sortByType<T>(a: T, b: T, type: string): number {
      switch (type) {
        case "string":
          if (a < b) return -1;
          else if (a > b) return 1;
          return 0;
        default:
          return +a - +b;
      }
    }
    switch (sorterType) {
      case "date": {
        const item1 = new Date(a[sorterType]!).getTime();
        const item2 = new Date(b[sorterType]!).getTime();
        return isAscending ? sortByType(item1, item2, "date") : sortByType(item2, item1, "date");
      }
      case "counter": {
        const item1 = a[sorterType];
        const item2 = b[sorterType];
        return isAscending ? sortByType(item1, item2, "number") : sortByType(item2, item1, "number");
      }
      case "title": {
        const item1 = a[sorterType]!.toLowerCase();
        const item2 = b[sorterType]!.toLowerCase();
        return isAscending ? sortByType(item1, item2, "string") : sortByType(item2, item1, "string");
      }
      default:
        return 0;
    }
  });

  const FilterButton: React.FC<{ buttonType: typeof sorterType }> = (props) => {
    const { buttonType, children } = props;
    const arrow: string = buttonType === sorterType ? (isAscending ? "▲" : "▼") : "";
    return (
      <Button className={classes.button} color="default" onClick={sorterHandler(buttonType)}>
        {children} {arrow}
      </Button>
    );
  };

  useEffect(() => {
    if (user) {
      fetchLinksRequestAction();
      linkService
        .getLinks(user._id)
        .then((data) => fetchLinksSuccessAction(data))
        .catch(fetchLinksFailureAction);
    }
    return (): void => {
      fetchLinksRequestAction();
    };
  }, [user]);

  const sorterHandler = (
    sorterButtonType: keyof ServiceTypes.IServerResponseLink
  ): React.MouseEventHandler => (): void => {
    setSorterState({
      sorterType: sorterButtonType,
      isAscending: sorterType === sorterButtonType ? !isAscending : false,
    });
  };

  const checkboxHandler = (checkboxIsChecked: boolean): React.ChangeEventHandler => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (checkboxIsChecked) {
      // Удаляем
      setFormCheckboxState([...formCheckboxState.filter((i) => i !== event.target.id)]);
    } else {
      // Добавляем
      formCheckboxState.push(event.target.id);
      setFormCheckboxState([...formCheckboxState]);
    }
  };

  const checkboxAllHandler = () => {
    if (!allCheckboxesAreChecked) {
      const newState = links.map((link) => link._id);
      setFormCheckboxState(newState);
    } else {
      setFormCheckboxState([]);
    }
  };

  const removeManyHandler = () => {
    fetchLinksRequestAction();
    linkService
      .removeLinkMany(formCheckboxState)
      .then(() =>
        linkService.getLinks(user!._id).then((data) => {
          fetchLinksSuccessAction(data);
          setFormCheckboxState([]);
        })
      )
      .catch(fetchLinksFailureAction);
  };

  if (!user) {
    return (
      <Box p={3}>
        <Typography variant="body1" component="div">
          Вы не авторизованы!
        </Typography>
      </Box>
    );
  } else if (isLoading) {
    return <Spinner />;
  } else if (error) {
    return <ErrorComponent error={error} />;
  } else if (links.length === 0) {
    return (
      <Box p={3}>
        <Typography variant="body1" component="div">
          Вы ещё не добавили ссылок
        </Typography>
      </Box>
    );
  } else {
    return (
      <Box p={1}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="none">
                <Checkbox
                  title="Выделить/снять все"
                  checked={allCheckboxesAreChecked}
                  onChange={checkboxAllHandler}
                  color="default"
                />
              </TableCell>
              <TableCell title="Сортировать по имени" padding="none">
                <FilterButton buttonType="title">Ссылка</FilterButton>
              </TableCell>
              {windowWidth >= 768 && (
                <>
                  <TableCell title="Переходов" padding="none">
                    <FilterButton buttonType="counter">&#10149;</FilterButton>
                  </TableCell>
                  <TableCell padding="none">
                    <FilterButton buttonType="date">Дата создания</FilterButton>
                  </TableCell>
                  <TableCell padding="none"></TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedLinks.map((link) => {
              const { _id } = link;
              const checkboxIsChecked: boolean = formCheckboxState.indexOf(_id) !== -1;
              return (
                <LinkElement
                  key={_id}
                  link={link}
                  checkboxHandler={checkboxHandler(checkboxIsChecked)}
                  checkboxIsChecked={checkboxIsChecked}
                />
              );
            })}
          </TableBody>
        </Table>

        <Box py={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="secondary"
            disabled={formCheckboxState.length === 0}
            onClick={removeManyHandler}
          >
            Удалить выделенные
          </Button>
        </Box>
      </Box>
    );
  }
};

const mapStateToProps = (state: StoreStatesTypes.StoreStateType) => ({
  linksState: state.linksState,
  userState: state.userState,
});

const mapDispatchToProps = {
  fetchLinksRequestAction,
  fetchLinksSuccessAction,
  fetchLinksFailureAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TableComponent);
