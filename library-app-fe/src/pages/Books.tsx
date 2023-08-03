import { useEffect, useState } from "react";
import { IBook, bookSelector, fetchBooks } from "../store/book/bookSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function Books() {

  const [books, setBooks] = useState<Array<IBook>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const selectedBooks = useAppSelector(bookSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(selectedBooks.loading);
    setError(selectedBooks.error);
    setBooks(selectedBooks.books);
  }, [selectedBooks]);

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);



    return (
      <div className="App">
        <h1>Books</h1>
        <p>{JSON.stringify(selectedBooks)}</p>
      </div>
    );
  }
  
  export default Books;