import { useEffect, useState } from "react";
import { bookSelector, fetchBooks } from "../store/book/bookSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import BookCard from "../components/BookCard";
import Button from "react-bootstrap/Button";
import FormModal from "../components/FormModal";
import { FormField, InputType } from "../models/form";
import { IBook } from "../models/book";
import { createAuthor } from "../services/author";
import { IAuthor } from "../models/author";

function Books() {

  const [books, setBooks] = useState<Array<IBook>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const selectedBooks = useAppSelector(bookSelector);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formFields: FormField[] = [
    {
      key: "firstName",
      label: "Enter the First name",
      type: InputType.TEXT
    },
    {
      key: "lastName",
      label: "Enter the Last name",
      type: InputType.TEXT
    }
  ];

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(selectedBooks.loading);
    setError(selectedBooks.error);
    setBooks(selectedBooks.books);
  }, [selectedBooks]);

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  const handleSubmit = async(values: Partial<IAuthor>) => {
    console.log("values", values)
    try {
      await createAuthor(values);      
      alert("Success")
    } catch (error) {
      alert("Failed to create author")
    }

  }

    return (
      <div className="container">
        <h1>Books</h1>
        <div className="row">
          <div className="col-12">
            
      <Button variant="primary" onClick={handleShow}>
        Create Author
      </Button>
      <FormModal 
        handleClose = { handleClose } 
        show = { show } 
        formFields = { formFields }
        handleSubmit = { handleSubmit }
      />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
          <div className="d-flex justify-content-center">
            { books?.map((book, index) => <BookCard key={ index } _id={ book._id } name= { book.name } isbn={ book.isbn } /> ) }
          </div>
          </div>
        </div>        
      </div>
    );
  }
  
  export default Books;