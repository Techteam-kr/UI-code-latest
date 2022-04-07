import Card from "react-bootstrap/Card";
import "./YojanaCardComponent.scss";
// import YojanaList from "../../../../public/data/MasterYojanaJSON.json";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const YojanaCardComponent = () => {
  const [YojanaList, setYojanaList] = useState([]);
  useEffect(() => {
    getDefaultYojana();
  }, []);
  const getDefaultYojana = () => {
    axios.get("./data/MasterYojanaJSON.json").then((res) => {
      setYojanaList(res.data);
    });
  };
  return (
    <div className="yojana-card-component">
      <div className="yojana-card-block">
        <Row>
          {YojanaList &&
            YojanaList.map((yojana) => (
              <Col xs={12} sm={6} className="single-card">
                <Card className="Yojana-card">
                  <Card.Body>
                    <Card.Title>{yojana.name}</Card.Title>
                    <Card.Text>
                      <h6>Criteria</h6>
                      <div className="criteria-block">
                        <Row>
                          {yojana.category && (
                            <Col sm={3} className="criteria-label max-space">
                              <label>Categories</label> :{" "}
                              <span
                                className="yojana-data"
                                title={yojana.category}
                              >
                                {yojana.category}
                              </span>
                            </Col>
                          )}
                          {yojana.age && (
                            <Col sm={3} className="criteria-label">
                              <label>Age</label> :{" "}
                              <span className="yojana-data">{yojana.age}</span>
                            </Col>
                          )}
                          {yojana.gender && (
                            <Col sm={3} className="criteria-label">
                              <label>Gender</label> :{" "}
                              <span className="yojana-data">
                                {yojana.gender}
                              </span>
                            </Col>
                          )}
                          {yojana.annual && (
                            <Col sm={3} className="criteria-label">
                              <label>Annual Income</label> :{" "}
                              <span className="yojana-data">
                                {yojana.annual}
                              </span>
                            </Col>
                          )}
                          {yojana.disability && (
                            <Col sm={3} className="criteria-label">
                              <label>Disablility</label> :{" "}
                              <span className="yojana-data">
                                {yojana.disability}
                              </span>
                            </Col>
                          )}
                          {yojana.caste && (
                            <Col sm={3} className="criteria-label">
                              <label>Catse</label> :{" "}
                              <span className="yojana-data">
                                {yojana.caste}
                              </span>
                            </Col>
                          )}
                        </Row>
                        <Row>
                          <Col xs={12} className="criteria-label full-width">
                            <span className="yojana-data yojana-desc">
                              <label>Description</label> :{" "}
                              {yojana.description ? yojana.description : "NA"}
                            </span>
                          </Col>
                        </Row>
                      </div>
                    </Card.Text>
                    <Card.Footer>
                      <Button className="navigate-yojana">
                        Click here to know more{" "}
                      </Button>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
};
export default YojanaCardComponent;
