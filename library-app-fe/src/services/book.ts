import { baseApiUrl } from "../config/config";
import { IBook, IBookCreateResponse, IBookResponse } from "../models/book";


export const createBook = (payload: Partial<IBook>) => {
    return fetch(`${baseApiUrl}/books`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(data => data.json()).then(data => data as IBookCreateResponse);
} 
