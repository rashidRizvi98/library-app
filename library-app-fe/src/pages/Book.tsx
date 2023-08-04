import { useEffect, useState } from "react";
import { getBook, updateBook } from "../services/book";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { IBook } from "../models/book";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authorSelector, fetchAuthors } from "../store/author/authorSlice";
import FormModal from "../components/FormModal";
import { bookformFields } from "../models/constants";
import Header from "../components/Header";

function Book() {
  const params= useParams()
  const [book, setBook] = useState<IBook | null>(null);

  const dispatch = useAppDispatch();

  const [showUpdateBookModal, setShowUpdateBookModal] = useState(false);
  const handleCloseUpdateBookModal = () => setShowUpdateBookModal(false);
  const handleShowUpdateBookModal = () => setShowUpdateBookModal(true);  

  const selectedAuthors = useAppSelector(authorSelector);
  let bookUpdateFormFields = bookformFields;
  
  useEffect(() => {
    if (selectedAuthors?.authors.length > 0) {
      fetchBook();
    }
  },[selectedAuthors.authors]);

  useEffect(() => {
    if (selectedAuthors?.authors.length == 0) {
      dispatch(fetchAuthors());
    }
  },[]);

  const fetchBook = async() => {
    const res = await getBook(params.id!)
    setBook(res.data);
    let bookData: any = res.data;
    bookData = { ...bookData, "author": bookData["author"]?.[0]?._id }
    bookUpdateFormFields.forEach((field, i) => {
       bookUpdateFormFields[i] = { ...field, defaultValue: bookData[field.key] } 
    })

    const authorFieldIndex = bookUpdateFormFields.findIndex( field =>  field.key == "author");
    bookUpdateFormFields[authorFieldIndex].options = selectedAuthors.authors?.map(author => ({_id: author._id, value: `${author.firstName} ${author.lastName} `}));
  }

  const handleUpdateBookSubmit =async (values:Partial<IBook>) => {
    try {
      await updateBook(values);   
      toast.success("Book updated"); 
      await fetchBook();
    } catch (error) {
      toast.error("Failed to update book"); 
    }finally {
      setShowUpdateBookModal(false); 
    }
  }

    return (
      <div>
        <Header/>
        <div className="container">
           <div className="row my-4">
              <div className="col-12">
                <h1>Book Details</h1>
              </div>
           </div>
           <div className="row">
              <div className="col-12">
                <div className="card mx-5" style={{width: "30rem"}}>
                  <div className="card-body">
                  <h4 className="card-title">Book name: { book?.name }</h4>
                  <h4 className="card-subtitle mb-2 text-muted">ISBN: { book?.isbn }</h4>  
                  <h4 className="card-subtitle mb-2 text-muted">Authored by: { `${book?.author?.[0]?.firstName} ${book?.author?.[0]?.lastName}` }</h4>  
                  <button className="btn btn-primary" onClick={ handleShowUpdateBookModal }> Update Book </button>
                  {
                   showUpdateBookModal && <FormModal 
                    operation = { 'UPDATE' }
                    formHeading = { 'Update Book' }
                    handleClose = { handleCloseUpdateBookModal } 
                    show = { showUpdateBookModal } 
                    formFields = { bookformFields }
                    handleSubmit = { handleUpdateBookSubmit }
                    _id = { book?._id }
                  />
                  }
                  </div>
                </div>
              </div>
           </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
  
  export default Book;