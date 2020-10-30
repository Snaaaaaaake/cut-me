import { ComponentStatesTypes, StoreStatesTypes } from "../types/reduxTypes";

export const FormRegistrationInitialState: ComponentStatesTypes.IFormRegistrationState = {
  name: "",
  password: "",
  passwordAgain: "",
  email: "",
  isLoading: false,
  error: null,
};

export const FormLoginInitialState: ComponentStatesTypes.IFormLoginState = {
  password: "",
  email: "",
  isLoading: false,
  error: null,
};

export const FormAddLinkInitialState: ComponentStatesTypes.IFormAddlinkState = {
  url: "",
  title: "",
  owner: "",
  short: "",
  isLoading: false,
  error: null,
  link: null,
};

export const FormEditLinkInitialState: ComponentStatesTypes.IFormEditLinkState = {
  isEditing: false,
  editValue: "",
  isLoading: false,
};

export const ModalStateInitialState: ComponentStatesTypes.IModalState = {
  isModalOpened: false,
  modalContent: "",
};

export const initialUserState: StoreStatesTypes.IUserState = {
  user: null,
  error: null,
  isLoading: false,
};

export const initialLinksState: StoreStatesTypes.ILinksState = {
  links: [],
  error: null,
  isLoading: false,
};

export const initialFilterState: ComponentStatesTypes.IFilterState = {
  sorterType: "date",
  isAscending: false,
};
