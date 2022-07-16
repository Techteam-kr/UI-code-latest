import { useEffect, useState } from "react";
import { fetchYojanaList } from "../../../utils/api";
import BannerComponent from "../../Banner/BannerComponent";
import YojanaCardComponent from "../../Common/YojanaCardComponent/YojanaCardComponent";
import YojanaFilterComponent from "../YojanaFilter/YojanaFilter";
import "./HomeComponent.scss";
const HomeComponent = ({ isAdmin }) => {
  const [YojanaList, setYojanaList] = useState([]);

  const getDefaultYojana = (params) => {
    fetchYojanaList(params).then((res) => {
      setYojanaList(res.data);
    });
  };

  useEffect(() => {
    let request = {
      categories: ["Housing", "Pension", "Women & Children", "BPL"],
      gender: "",
      disability: "",
      ageLowerLimit: "",
      ageHigherLimit: "",
    };
    getDefaultYojana(request);
  }, []);
  return (
    <div className="home-block">
      <BannerComponent src="static/images/banner-image.png" />
      <YojanaFilterComponent getDefaultYojana={getDefaultYojana} />
      <YojanaCardComponent YojanaList={YojanaList} />
    </div>
  );
};
export default HomeComponent;
