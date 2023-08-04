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
import { authorSelector, fetchAuthors } from "../store/author/authorSlice";
import { createAuthorformFields, createBookformFields } from "../models/constants";
import { createBook } from "../services/book";

function Books() {

  const [books, setBooks] = useState<Array<IBook>>([]);
  const [loadingBooks, setBooksLoading] = useState<boolean>(false);
  const [errorBooks, setBooksError] = useState<string | undefined>(undefined);
  const selectedBooks = useAppSelector(bookSelector);

  const [authors, setAuthors] = useState<Array<IAuthor>>([]);
  const [loadingAuthors, setAuthorsLoading] = useState<boolean>(false);
  const [errorAuthors, setAuthorsError] = useState<string | undefined>(undefined);
  const selectedAuthors = useAppSelector(authorSelector);

  const [showCreateAuthorModal, setShowCreateAuthorModal] = useState(false);
  const handleCloseCreateAuthorModal = () => setShowCreateAuthorModal(false);
  const handleShowCreateAuthorModal = () => setShowCreateAuthorModal(true);

  const [showCreateBookModal, setShowCreateBookModal] = useState(false);
  const handleCloseCreateBookModal = () => setShowCreateBookModal(false);
  const handleShowCreateBookModal = () => setShowCreateBookModal(true);


  const dispatch = useAppDispatch();

  useEffect(() => {
    setBooksLoading(selectedBooks.loading);
    setBooksError(selectedBooks.error);
    setBooks(selectedBooks.books);
  }, [selectedBooks]);

  useEffect(() => {
    setAuthorsLoading(selectedAuthors.loading);
    setAuthorsError(selectedAuthors.error);
    setAuthors(selectedAuthors.authors);

   const authorFieldIndex = createBookformFields.findIndex( field =>  field.key == "author");
    createBookformFields[authorFieldIndex].options = selectedAuthors.authors?.map(author => ({_id: author._id, value: `${author.firstName} ${author.lastName} `  }));
  }, [selectedAuthors]);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchAuthors());
  }, []);

  const handleCreateAuthorSubmit = async(values: Partial<IAuthor>) => {
    console.log("values", values)
    try {
      await createAuthor(values);      
      alert("Success")
    } catch (error) {
      alert("Failed to create author")
    }

  }

  const handleCreateBookSubmit = async(values: Partial<IAuthor>) => {
    console.log("values", values)
    try {
      await createBook(values);
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
            <div className="d-flex justify-content-around">
            <Button variant="primary" onClick={handleShowCreateAuthorModal}>
              Create Author
            </Button>
            <FormModal 
              handleClose = { handleCloseCreateAuthorModal } 
              show = { showCreateAuthorModal } 
              formFields = { createAuthorformFields }
              handleSubmit = { handleCreateAuthorSubmit }
            />
            <Button variant="primary" onClick={handleShowCreateBookModal}>
              Create Book
            </Button>
            <FormModal 
              handleClose = { handleCloseCreateBookModal } 
              show = { showCreateBookModal } 
              formFields = { createBookformFields }
              handleSubmit = { handleCreateBookSubmit }
            />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
          <div className="d-flex flex-wrap justify-content-center">
            { books?.map((book, index) => <BookCard key={ index } _id={ book._id } name= { book.name } isbn={ book.isbn } /> ) }
          </div>
          </div>
        </div>        
      </div>
    );
  }
  
  export default Books;