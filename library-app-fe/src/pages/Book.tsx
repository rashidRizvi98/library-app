import { useEffect, useState } from "react";
import { getBook } from "../services/book";
import { Link, useParams } from "react-router-dom";
import { IBook } from "../models/book";

function Book() {
  const params= useParams()
  const [book, setBook] = useState<IBook | null>(null);

  useEffect(() => {
    fetchBook();
  },[]);

  const fetchBook = async() => {
    const res = await getBook(params.id!)
    setBook(res.data);
  }

    return (
      <div className="container">
         <div className="row">
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
                <button className="btn btn-primary"> Update Book </button>
                </div>
              </div>
            </div>
         </div>
      </div>
    );
  }
  
  export default Book;