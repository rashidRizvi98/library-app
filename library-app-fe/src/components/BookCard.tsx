import { IBook } from "../models/book";

function BookCard(props: IBook) {
    return (
        <div className="card mx-5" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{ props.name }</h5>
          <h6 className="card-subtitle mb-2 text-muted">{ props.isbn }</h6>
          <a href="#" className="card-link">View</a>
        </div>
      </div>
    );
  }
  
  export default BookCard;