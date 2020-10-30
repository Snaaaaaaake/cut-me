import { IAction, StoreStatesTypes } from "../types/reduxTypes";
import { initialUserState as initialState } from "../store/initialStates";

const userReducer = (
  state = initialState,
  action: IAction
): StoreStatesTypes.IUserState => {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return {
        ...initialState,
        isLoading: true,
      };
    case "FETCH_USER_SUCCESS":
      return {
        ...initialState,
        user: action.payload,
      };
    case "FETCH_USER_FAILURE":
      return {
        ...initialState,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
