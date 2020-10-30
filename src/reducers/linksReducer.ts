import { IAction, StoreStatesTypes } from "../types/reduxTypes";
import { initialLinksState as initialState } from "../store/initialStates";

const userReducer = (
  state = initialState,
  action: IAction
): StoreStatesTypes.ILinksState => {
  switch (action.type) {
    case "FETCH_LINKS_REQUEST":
      return {
        ...initialState,
        isLoading: true,
      };
    case "FETCH_LINKS_SUCCESS":
      return {
        ...initialState,
        links: action.payload,
      };
    case "FETCH_LINKS_FAILURE":
      return {
        ...initialState,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
