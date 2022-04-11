import "./BannerComponent.scss";
const BannerComponent = ({ src }) => {
  return (
    <div className="banner-block">
      <img className="banner-img" src={src} alt="logo" />
    </div>
  );
};
export default BannerComponent;
