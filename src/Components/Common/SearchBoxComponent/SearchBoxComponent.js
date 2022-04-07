import { Col, Form, Row } from "react-bootstrap";
import { preventEvent } from "../../../utils/helper";
import SVG from "react-inlinesvg";
import "./SearchBoxComponent.scss";
const SearchBoxComponent = () => {
  const onEnter = (event) => {
    if (event.keyCode === 13) {
      console.log("enter clicked");
    }
  };
  const onChange = (e) => {
    console.log("on Chnage");
  };
  return (
    <Form
      noValidate
      autoComplete="off"
      onSubmit={preventEvent}
      onKeyUp={onEnter}
    >
      <Form.Group className="search-box" controlId="search=input">
        <Row>
          <Col xs sm="12">
            <input
              type="text"
              placeholder="Search yojana"
              id="searchYojana"
              name="searchYojana"
              onChange={onChange}
            />
            <SVG cacheRequests={true} src={`/static/svg/icons8-search.svg`} />
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default SearchBoxComponent;
