import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { noteActions } from "../modules/note";
import Spinner from "./Spinner";

const Paging = (props) => {
  const dispatch = useDispatch();
  const isLoading = props.isLoading;
  const paging = props.paging;
  const projectId = props.projectId;
  const [page, setPage] = useState({
    start: 0,
    end: 10,
  });

  const nextPage = () => {
    if (!isEnd) {
      setPage({
        start: page.start + 10,
        end: page.end + 10,
      });
      paginate(page.start + 11);
    } else {
      paginate(paging.totalPages);
    }
  };

  const prePage = () => {
    if (!isStart) {
      setPage({
        start: page.start - 10,
        end: page.end - 10,
      });
      paginate(page.end - 10);
    } else {
      paginate(1);
    }
  };

  const pageNumbers = [];
  for (let i = 0; i < paging.totalPages; i++) {
    pageNumbers.push(i + 1);
  }

  const isEnd = page.end + 10 >= pageNumbers.length + 10 ? true : false;

  const isStart = page.start - 1 === -1 ? true : false;

  const paginate = useCallback((pageNumber) => {
    projectId ? dispatch(props.module(projectId, pageNumber, paging.size)) : dispatch(props.module(pageNumber, paging.size));
  }, []);

  return (
    <React.Fragment>
      <Spinner visible={isLoading} />
      {paging.totalElements === 0 ? (
        ""
      ) : (
        <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <PageBtn style={{ color: "#D6D6D6" }} onClick={() => ((paging.pageNumber / 10 - 1) * 10 + 10 ? prePage() : paginate(1))}>
            {"<<"}
          </PageBtn>
          <PageBtn
            style={{ color: "#D6D6D6" }}
            onClick={() => {
              paging.first ? alert("첫번째페이지입니다!") : paging.pageNumber % 10 === 1 ? prePage() : paginate(paging.pageNumber - 1);
            }}
          >
            {"<"}
          </PageBtn>
          {pageNumbers.slice(page.start, page.end).map((pageNum) => (
            <PageBtn
              key={pageNum}
              onClick={() => paginate(pageNum)}
              style={paging.pageNumber === pageNum ? { background: "#e1ede4" } : { background: "none" }}
            >
              {pageNum}
            </PageBtn>
          ))}

          <PageBtn
            style={{ color: "#D6D6D6" }}
            onClick={() => {
              paging.last ? alert("마지막페이지입니다!") : paging.pageNumber % 10 === 0 ? nextPage() : paginate(paging.pageNumber + 1);
            }}
          >
            {">"}
          </PageBtn>
          <PageBtn style={{ color: "#D6D6D6" }} onClick={() => ((paging.pageNumber / 10 + 1) * 10 + 1 ? nextPage() : paginate(paging.totalPages))}>
            {">>"}
          </PageBtn>
        </div>
      )}
    </React.Fragment>
  );
};

const PageBtn = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  background: none;
  margin: 2px;
  padding: 2px;
  text-align: center;
  justify-content: center;
  line-height:12.5px
  font-size: 16px;
  color: #767676;
  font-weight: 400;

  &:hover {
    background: #e1ede4;
    cursor: pointer;
    color: #000;
  }
`;

export default Paging;
