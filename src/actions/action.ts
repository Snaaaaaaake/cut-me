import { IAction } from "../types/reduxTypes";
import { actionCreatorType } from "../types/reduxTypes";

const fetchUserRequestAction: actionCreatorType = (): IAction => ({
  type: "FETCH_USER_REQUEST",
});

const fetchUserSuccessAction: actionCreatorType = (data): IAction => ({
  type: "FETCH_USER_SUCCESS",
  payload: data,
});

const fetchUserFailureAction: actionCreatorType = (err): IAction => ({
  type: "FETCH_USER_FAILURE",
  payload: err,
});

const fetchLinksRequestAction: actionCreatorType = (): IAction => ({
  type: "FETCH_LINKS_REQUEST",
});

const fetchLinksSuccessAction: actionCreatorType = (data): IAction => ({
  type: "FETCH_LINKS_SUCCESS",
  payload: data,
});

const fetchLinksFailureAction: actionCreatorType = (err): IAction => ({
  type: "FETCH_LINKS_FAILURE",
  payload: err,
});

export {
  fetchUserRequestAction,
  fetchUserSuccessAction,
  fetchUserFailureAction,
  fetchLinksRequestAction,
  fetchLinksSuccessAction,
  fetchLinksFailureAction,
};
