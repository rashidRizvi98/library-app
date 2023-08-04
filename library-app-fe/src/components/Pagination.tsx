import React from "react";
import { IPagination } from "../models/pagination";
import Pagination from "react-bootstrap/Pagination";

const Paginate = ({ itemsPerPage, totalItems, paginate, currentPage }: IPagination) => {
  let active = currentPage;
  let items = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    items.push(
      <Pagination.Item
        onClick={() => paginate(i)}
        key={i}
        active={i === active}
      >
        {i}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div className="d-flex justify-content-center">
      <Pagination >
        {items}
      </Pagination>
    </div>
  );
  return <div>{paginationBasic}</div>;
};

export default Paginate;