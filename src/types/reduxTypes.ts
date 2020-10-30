import { RootReducerType } from "../reducers/rootReducer";
import { ServiceTypes } from "./appTypes";

// Component states
export namespace ComponentStatesTypes {
  export interface IFormState {
    isLoading: boolean;
    error: string | null;
  }
  export interface IFormRegistrationState extends IFormState {
    name: string;
    password: string;
    passwordAgain: string;
    email: string;
  }
  export interface IFormLoginState extends IFormState {
    password: string;
    email: string;
  }
  export interface IFormAddlinkState extends IFormState {
    url: string;
    title: string;
    owner: string;
    short: string;
    link: string | null;
  }
  export interface IFormEditLinkState {
    isEditing: boolean;
    editValue: string;
    isLoading: boolean;
  }
  export interface IModalState {
    isModalOpened: boolean;
    modalContent: JSX.Element | string;
  }
  export interface IFilterState {
    sorterType: keyof ServiceTypes.IServerResponseLink;
    isAscending: boolean;
  }
}

// Store states
export namespace StoreStatesTypes {
  interface IState {
    isLoading: boolean;
    error: Error | null;
  }
  export interface IUserState extends IState {
    user: ServiceTypes.IServerResponseUser | null;
  }
  export interface ILinksState extends IState {
    links: ServiceTypes.IServerResponseLink[];
  }
  export type StoreStateType = ReturnType<RootReducerType>;
}

// Dispatch
export interface IAction {
  type: string;
  payload?: any;
}
export type actionCreatorType = (
  data?: ServiceTypes.IServerResponseLink[] | ServiceTypes.IServerResponseUser | Error | null
) => IAction;
