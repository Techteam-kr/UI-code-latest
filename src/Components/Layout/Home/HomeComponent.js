import Container from "react-bootstrap/Container";
import BannerComponent from "../../Banner/BannerComponent";
import YojanaCardComponent from "../../Common/YojanaCardComponent/YojanaCardComponent";
import YojanaFilterComponent from "../YojanaFilter/YojanaFilter";
import "./HomeComponent.scss";
const HomeComponent = () => {
  return (
    <div className="home-block">
      {/* <Container> */}
      <BannerComponent />
      <YojanaFilterComponent />
      <YojanaCardComponent />
      {/* </Container> */}
    </div>
  );
};
export default HomeComponent;
