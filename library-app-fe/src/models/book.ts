import { IAuthor } from "./author";

export interface IBook {
    _id: string;
    name: string;
    isbn: string;
    author?: IAuthor[];
  }

export interface IBooksResponse {
  data: IBook[]
}

export interface IBookResponse {
  data: IBook
}

export interface IBookCreateResponse {
  data: IBook
}