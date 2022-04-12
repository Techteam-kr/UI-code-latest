import "./SearchBoxComponent.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import _map from "lodash/map";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { fetchYojanaNames } from "../../../utils/api";
// import {yojanaList} from '../../../utils/'
const SearchBoxComponent = () => {
  const [yojanaNames, setYojanaNames] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    getYojanaNamesList();
  }, []);

  const getYojanaNamesList = () => {
    fetchYojanaNames().then((res) => {
      const yojanas = _map(res.data?.names, (item, index) => ({
        id: index,
        name: item,
      }));
      setYojanaNames(yojanas);
    });
  };
  const onEnter = (event) => {
    if (event.keyCode === 13) {
      console.log("enter clicked");
    }
  };
  const onChange = (e) => {
    console.log("on Chnage");
  };
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
    navigator("yojana-detail", {
      search: `?${item.id}`,
      state: { yojanaId: item.id, title: item.name },
    });
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };
  return (
    <React.Fragment>
      <div className="auto-complete-search">
        <ReactSearchAutocomplete
          items={yojanaNames}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          formatResult={formatResult}
          placeholder="Search Yojana Scheme"
        />
      </div>
    </React.Fragment>
  );
};

export default SearchBoxComponent;
