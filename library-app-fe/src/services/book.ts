import { baseApiUrl } from "../config/config";
import { IBook, IBookCreateResponse, IBookResponse } from "../models/book";


export const createBook = async(payload: Partial<IBook>) => {
    const response = await fetch(`${baseApiUrl}/books`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await response.json();

    if (response.status != 201) {
        return Promise.reject(response);
    }
    return data as IBookCreateResponse;
} 

export const getBook = (id: string) => {
    return fetch(`${baseApiUrl}/books/${id}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(data => data.json()).then(data => data as IBookResponse);
}

export const updateBook = async(payload: Partial<IBook>) => {
    const response = await fetch(`${baseApiUrl}/books`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await response.json();

    if (response.status != 200) {
        return Promise.reject(response);
    }

    return data as IBookCreateResponse;
} 