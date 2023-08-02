import { Schema, Types, model } from "mongoose";


export interface IBook {
  name: string;
  isbn: string;
  author: Types.ObjectId;
  }
  
const bookSchema = new Schema<IBook>({
  name: { type: String, required: true },
  isbn: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author' }
});

export const Book = model<IBook>('Book', bookSchema);

