import { Card, div, Row, Button, Col } from "react-bootstrap";
import YojanaEnrollment from "../EnrollmentComponent/YojanaEnrollment";
import "./YojanaCard.scss";
const YojanaCard = ({
  yojana,
  yojanaClickHandler,
  label,
  enrollment,
  userEnrollHandler,
}) => {
  return (
    <Card className="Yojana-card">
      <Card.Body>
        <Card.Title>{yojana.name}</Card.Title>
        <Card.Text>
          <h6>{label}</h6>
          <div className="criteria-block">
            <Row>
              {yojana.category && (
                <div className="criteria-label max-space">
                  <label>Categories</label> :{" "}
                  <span className="yojana-data" title={yojana.category}>
                    {yojana.category}
                  </span>
                </div>
              )}
              {yojana.age && (
                <div className="criteria-label">
                  <label>Age</label> :{" "}
                  <span className="yojana-data">{yojana.age}</span>
                </div>
              )}
              {yojana.gender && (
                <div className="criteria-label">
                  <label>Gender</label> :{" "}
                  <span className="yojana-data">{yojana.gender}</span>
                </div>
              )}
              {yojana.annual && (
                <div className="criteria-label">
                  <label>Annual Income</label> :{" "}
                  <span className="yojana-data">{yojana.annual}</span>
                </div>
              )}
              {yojana.disability && (
                <div className="criteria-label">
                  <label>Disablility</label> :{" "}
                  <span className="yojana-data">{yojana.disability}</span>
                </div>
              )}
              {yojana.caste && (
                <div className="criteria-label">
                  <label>Catse</label> :{" "}
                  <span className="yojana-data">{yojana.caste}</span>
                </div>
              )}
            </Row>
            <Row>
              <Col xs={12} className="criteria-label full-width">
                <span className="yojana-data yojana-desc">
                  <label>Description</label> :{" "}
                  {yojana.shortDescription ? yojana.shortDescription : "NA"}
                </span>
              </Col>
            </Row>
          </div>
        </Card.Text>
        <Card.Footer>
          <Button
            className="navigate-yojana"
            onClick={() => yojanaClickHandler(yojana)}
          >
            Click here to know more{" "}
          </Button>
          {enrollment && (
            <YojanaEnrollment YojanaName={yojana.name} id={yojana.id} />

            // <Button className="user-enrollment" onClick={userEnrollHandler}>
            //   {" "}
            //   Yojana Enrollment
            // </Button>
          )}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default YojanaCard;
