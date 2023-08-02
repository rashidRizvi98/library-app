import { Schema, model } from "mongoose";


export interface IAuthor {
    firstName: string;
    lastName: string;
  }
  
const authorSchema = new Schema<IAuthor>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

export const Author = model<IAuthor>('Author', authorSchema);

