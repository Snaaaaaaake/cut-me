export namespace ServiceTypes {
  interface IServerResponse {
    _id: string;
    __v: number;
  }

  export interface IServerResponseUser extends IServerResponse {
    name: string;
    email: string;
  }

  export interface IServerResponseLink extends IServerResponse {
    url: string;
    owner: string;
    title?: string;
    counter: number;
    date: string;
    hash: string;
  }

  export interface IserverResponseStatus {
    statusCode: number;
    message?: string;
  }
}

export interface LayoutPropsType {
  children: JSX.Element;
}
