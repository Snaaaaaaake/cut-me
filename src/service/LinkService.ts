import { ServiceTypes } from "../types/appTypes";
import siteUrl from "../constants/siteUrl";

const headers = { "Content-Type": "application/json" };
async function resCheck(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw await res.json();
  }
}

export default class LinkService {
  private apiUrl: string;
  private usersUrl: string;
  private linksUrl: string;
  constructor(apiUrl?: string) {
    this.apiUrl = apiUrl || siteUrl;
    this.usersUrl = `${this.apiUrl}/usersApi`;
    this.linksUrl = `${this.apiUrl}/linksApi`;
  }

  public getUser(): Promise<ServiceTypes.IServerResponseUser> {
    return fetch(`${this.usersUrl}/me`, {
      headers,
      credentials: "include",
    }).then(resCheck);
  }

  public userSignUp(
    name: string,
    email: string,
    password: string
  ): Promise<ServiceTypes.IServerResponseUser> {
    return fetch(`${this.usersUrl}/signup`, {
      method: "post",
      headers,
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then(resCheck);
  }

  public userSignIn(password: string, email: string): Promise<ServiceTypes.IServerResponseUser> {
    return fetch(`${this.usersUrl}/signin`, {
      method: "post",
      headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(resCheck);
  }

  public userSignOut(): Promise<ServiceTypes.IserverResponseStatus> {
    return fetch(`${this.usersUrl}/signout`, {
      headers,
      credentials: "include",
    }).then(resCheck);
  }

  public addLink(
    url: string,
    owner: string | null,
    title: string,
    short: string
  ): Promise<ServiceTypes.IServerResponseLink[]> {
    return fetch(`${this.linksUrl}/add`, {
      method: "post",
      headers,
      body: JSON.stringify({
        url,
        title,
        short,
        owner,
      }),
    }).then(resCheck);
  }

  public getLinks(_id: string): Promise<ServiceTypes.IServerResponseLink[]> {
    return fetch(`${this.linksUrl}/get`, {
      method: "post",
      credentials: "include",
      headers,
      body: JSON.stringify({
        owner: _id,
      }),
    }).then(resCheck);
  }

  public removeLink(_id: string): Promise<ServiceTypes.IserverResponseStatus> {
    return fetch(`${this.linksUrl}/remove`, {
      method: "delete",
      credentials: "include",
      headers,
      body: JSON.stringify({
        _id,
      }),
    }).then(resCheck);
  }

  public removeLinkMany(array: string[]): Promise<ServiceTypes.IserverResponseStatus> {
    return fetch(`${this.linksUrl}/removeMany`, {
      method: "delete",
      credentials: "include",
      headers,
      body: JSON.stringify({
        array,
      }),
    }).then(resCheck);
  }

  public editLink(_id: string, title: string): Promise<ServiceTypes.IServerResponseLink[]> {
    return fetch(`${this.linksUrl}/edit`, {
      method: "post",
      credentials: "include",
      headers,
      body: JSON.stringify({
        _id,
        title,
      }),
    }).then(resCheck);
  }
}
