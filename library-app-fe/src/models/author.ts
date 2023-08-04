export interface IAuthor {
    _id: string;
    firstName: string;
    lastName: string;
}

export interface IAuthorCreateResponse {
    data: IAuthor
  }

export interface IAuthorsResponse {
  data: IAuthor[]
}