import "./YojanaCardComponent.scss";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import _isFunction from "lodash/isFunction";
import { useNavigate } from "react-router-dom";
import YojanaCard from "./YojanaCard";
// import { Pagination } from "../Pagination/Pagination";
// import { sortBy } from "lodash";
import Pagination from "../Pagination/Pagination";

let sortByOptions = [
  { key: "title", label: "title" },
  { key: "yojanaCreated", label: "Recently added Yojana" },
];
const pageSizeOptions = [
  { key: 3, label: "3" },
  { key: 6, label: "6" },
  { key: 9, label: "9" },
  { key: 12, label: "12" },
];

const YojanaCardComponent = ({ YojanaList }) => {
  const [sortPaging, setSortPaging] = useState({
    sortBy: "title",
    pageSize: 3,
    activePage: 0,
  });
  const navigator = useNavigate();
  let { sortBy, pageSize, activePage } = sortPaging;

  useEffect(() => {
    // const offset = activePage * pageSize;
    // let [sort, direction = "asc"] = sortBy;
  }, []);

  const yojanaClickHandler = (yojana) => {
    navigator("yojana-detail", {
      search: `?${yojana.id}`,
      state: { yojanaId: yojana.id, title: yojana.name },
    });
  };
  const onPaginationChange = (pagination, isBottom) => {
    if (_isFunction(onChangeSortPaging)) {
      onChangeSortPaging({ ...pagination });
    }
  };
  const onChangeSortPaging = (data) => {
    setSortPaging({ ...data });
  };
  const PaginationEle = ({ bottom }) => (
    <div className="sort-block">
      <Pagination
        total={YojanaList?.length}
        pageSize={pageSize}
        active={activePage}
        sortBy={sortBy}
        onChange={(args) => onPaginationChange(args, bottom)}
        sortByOptions={sortByOptions}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
  return (
    <div className="yojana-card-component">
      <div className="yojana-card-block">
        {/* <PaginationEle /> */}
        <Row>
          {YojanaList &&
            YojanaList.map((yojana, index) => (
              <Col key={index} xs={12} sm={6} className="single-card">
                <YojanaCard
                  label={"Criteria"}
                  yojana={yojana}
                  yojanaClickHandler={yojanaClickHandler}
                />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};
export default YojanaCardComponent;
