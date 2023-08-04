import { Link } from "react-router-dom";
import { IBook } from "../models/book";

function BookCard(props: IBook) {
    return (
        <div className="card mx-3 my-5" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{ props.name }</h5>
          <Link to={`/books/${props?._id}`} className="btn btn-primary">
                      View
          </Link>
        </div>
      </div>
    );
  }
  
  export default BookCard;