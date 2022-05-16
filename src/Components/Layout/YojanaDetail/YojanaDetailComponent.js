import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, div, NavLink, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import BannerComponent from "../../Banner/BannerComponent";
import YojanaCard from "../../Common/YojanaCardComponent/YojanaCard";
import { searchYojanas } from "../../../utils/api";
import "./YojanaDetailComponent.scss";
const YojanaDetailComponent = () => {
  const [YojanaCategory, setYojanaCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  useEffect(() => {
    getDefaultYojana();
    window.scroll({ top: 0, behavior: "smooth" });
    console.log(location.state, "yojanaId");
  }, [location]);

  const getDefaultYojana = () => {
    let request = {
      searchValue: location.state.title,
    };
    // axios
    //   .post("http://52.88.137.206:9001/searchYojanas", request)
    searchYojanas(request).then((res) => {
      console.log(res.data, "detail response");
      setYojanaCategory(res.data[0]);
    });
  };

  const yojanaClickHandler = () => {};
  const userEnrollHandler = () => {
    setShowModal(true);
  };
  return (
    <div className="detail-container">
      <BannerComponent src="static/images/detail-image.png" />
      <div className="yojana-detail-card">
        <Card>
          <strong>ID no: {location.state.yojanaId}</strong>
          <h4>{location.state.title}</h4>
          <p>{YojanaCategory?.longDescription}</p>
          {YojanaCategory?.eligibility.length > 0 && (
            <>
              <strong>Eligibility</strong>
              <ul>
                {YojanaCategory &&
                  YojanaCategory.eligibility.map((value) => <li>{value}</li>)}
              </ul>
            </>
          )}
          {YojanaCategory?.link && (
            <>
              <a
                className="page-link"
                href={YojanaCategory?.link}
                target="blank"
              >
                {YojanaCategory?.link}
              </a>
            </>
          )}

          {YojanaCategory?.implementedBy && (
            <div className="rt-aln">
              <span>
                Implemented by: <strong>{YojanaCategory?.implementedBy}</strong>
              </span>
            </div>
          )}
          <div className="eligible-block">
            {YojanaCategory && (
              <YojanaCard
                yojana={YojanaCategory}
                yojanaClickHandler={yojanaClickHandler}
                enrollment={true}
                userEnrollHandler={userEnrollHandler}
              />
            )}
          </div>
        </Card>
        <div className="video-block">
          <video
            width={
              window.screen.width < 768
                ? "100%"
                : window.screen.width >= 768 && window.screen.width <= 1024
                ? "100%"
                : "60%"
            }
            height="320"
            controls
          >
            <source
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              className="video-player"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  );
};
export default YojanaDetailComponent;
