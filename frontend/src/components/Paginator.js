import React, { useEffect, useContext } from "react";
import { Pagination } from "react-bootstrap";
import { useHistory } from "react-router-dom";

// Redux related
import { useDispatch } from "react-redux";

// Contexts
import { langContext } from "../contexts/LanguageContext";

export default function Paginator(props) {
  const { page, currIndex, api } = props;
  const { contextLang } = useContext(langContext);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(api(currIndex, contextLang));
  }, [dispatch, api, currIndex, contextLang]);

  const firstPage = () => {
    dispatch(api(1, contextLang));
    history.push(`/${page}/1`);
  };

  const prevPage = () => {
    const prevIndex = parseInt(currIndex) - 1;

    try {
      if (prevIndex > 0) {
        dispatch(api(prevIndex, contextLang));
        history.push(`/${page}/${prevIndex}`);
      }
    } catch (err) {
      if (err) {
        console.log("No previous page");
      }
    }
  };
  const nextPage = () => {
    const nextIndex = parseInt(currIndex) + 1;
    try {
      dispatch(api(nextIndex, contextLang));
      history.push(`/${page}/${nextIndex}`);
    } catch (err) {
      if (err) {
        console.log("No next page");
      }
    }
  };

  return (
    <Pagination>
      <Pagination.First onClick={firstPage} />
      <Pagination.Prev onClick={prevPage} />
      <Pagination.Next onClick={nextPage} />
    </Pagination>
  );
}
