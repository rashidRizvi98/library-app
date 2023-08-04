import { useEffect, useState } from "react";
import { bookSelector, fetchBooks } from "../store/book/bookSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import BookCard from "../components/BookCard";
import Button from "react-bootstrap/Button";
import FormModal from "../components/FormModal";
import Pagination from 'react-bootstrap/Pagination';
import { IBook } from "../models/book";
import { createAuthor } from "../services/author";
import { IAuthor } from "../models/author";
import { authorSelector, fetchAuthors } from "../store/author/authorSlice";
import { createAuthorformFields, bookformFields } from "../models/constants";
import { createBook } from "../services/book";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import Paginate from "../components/Pagination";
import AuthorsList from "../components/AuthorsList";

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
  const handleShowCreateBookModal = () => {
  
    if (selectedAuthors.authors.length == 0) {
      toast.warn("Please create an author first");  
      return;
    }

    setShowCreateBookModal(true)
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [booksPerPage] = useState(5);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setBooksLoading(selectedBooks.loading);
    setBooksError(selectedBooks.error);
    setBooks(selectedBooks.paginatedBooks.books);

  }, [selectedBooks]);

  useEffect(() => {
    setAuthorsLoading(selectedAuthors.loading);
    setAuthorsError(selectedAuthors.error);
    setAuthors(selectedAuthors.authors);

   const authorFieldIndex = bookformFields.findIndex( field =>  field.key == "author");
    bookformFields[authorFieldIndex].options = selectedAuthors.authors?.map(author => ({_id: author._id, value: `${author.firstName} ${author.lastName} `  }));
  }, [selectedAuthors]);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, []);

  useEffect(() => {
    dispatch(fetchBooks({page: currentPage,size: booksPerPage}));
  },[currentPage]);

  const handleCreateAuthorSubmit = async(values: Partial<IAuthor>) => {
    console.log("values", values)
    try {
      await createAuthor(values);  
      toast.success("Author created");
      dispatch(fetchAuthors()); 
    } catch (error) {
      toast.info("Failed to create author"); 
    }finally {
      setShowCreateAuthorModal(false);
    }

  }

  const handleCreateBookSubmit = async(values: Partial<IAuthor>) => {
    console.log("values", values)
    try {
      await createBook(values);
      toast.success("Book created"); 
      dispatch(fetchBooks({page: currentPage,size: booksPerPage}));
    } catch (error) {
      toast.info("Failed to create book"); 
    } finally {
      setShowCreateBookModal(false);
    }

  }

    return (
      <div>
        <Header/>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-center">
              <Button className="mx-4" variant="primary" onClick={handleShowCreateAuthorModal}>
                Create Author
              </Button>
              <FormModal 
                formHeading = { 'Create Author' }
                handleClose = { handleCloseCreateAuthorModal } 
                show = { showCreateAuthorModal } 
                formFields = { createAuthorformFields }
                handleSubmit = { handleCreateAuthorSubmit }
              />
              <Button className="mx-4" variant="primary" onClick={handleShowCreateBookModal}>
                Create Book
              </Button>
              <FormModal 
                formHeading = { 'Create Book' }
                handleClose = { handleCloseCreateBookModal } 
                show = { showCreateBookModal } 
                formFields = { bookformFields }
                handleSubmit = { handleCreateBookSubmit }
              />
              </div>
            </div>
          </div>
          <div className="row my-4">
            <div className="col-md-3">
              <AuthorsList authors = { authors }/>
            </div>
            <div className="col-md-9">
            <div className="d-flex flex-wrap justify-content-center">
              { books?.map((book, index) => <BookCard key={ index } _id={ book._id } name= { book.name } isbn={ book.isbn } /> ) }
            </div>
            </div>
          </div>        
        </div>
        <ToastContainer />
        <div>
        <Paginate
              itemsPerPage={booksPerPage}
              totalItems={selectedBooks.paginatedBooks.totalElements}
              paginate={paginate}
              currentPage={currentPage}
            />
        </div>
      </div>
    );
  }
  
  export default Books;