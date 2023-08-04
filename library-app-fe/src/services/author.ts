import { baseApiUrl } from "../config/config";
import { IAuthor, IAuthorCreateResponse } from "../models/author";

export const createAuthor = async(payload: Partial<IAuthor>) => {
    const response = await fetch(`${baseApiUrl}/authors`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await response.json();

    if (response.status != 201) {
        return Promise.reject(response);
    }
    return data as IAuthorCreateResponse;
} 