import { baseApiUrl } from "../config/config";
import { IAuthor, IAuthorCreateResponse } from "../models/author";

export const createAuthor = (payload: Partial<IAuthor>) => {
    return fetch(`${baseApiUrl}/authors`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(data => data.json()).then(data => data as IAuthorCreateResponse);
} 