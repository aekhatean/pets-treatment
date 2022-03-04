import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Paginator(props) {
  const { path, api } = props;
  const [pageNumber, setPageNumber] = useState(1);
  const [nexPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();

  useEffect(() => {
    api.get(`${path}?page=${pageNumber}`).then((res) => {
      setNextPage(res.data.links.next);
      setPrevPage(res.data.links.previous);
    });
  }, [api, pageNumber, path]);

  const goFirstPage = () => {
    api.get(`${path}?page=1`);
  };

  const goPrevPage = () => {
    if (prevPage != null) {
      api.get(`${path}?page=${prevPage}`);
    }
  };

  const goNextPage = () => {
    if (nexPage != null) {
      api.get(`${path}?page=${nexPage}`);
    }
  };

  return (
    <Pagination>
      <Pagination.First onClick={goFirstPage} />
      <Pagination.Prev onClick={goPrevPage} />
      <Pagination.Next onClick={goNextPage} />
    </Pagination>
  );
}
