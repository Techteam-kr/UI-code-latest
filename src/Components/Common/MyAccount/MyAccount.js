import { useEffect, useState } from "react";
import SearchApplicant from "../../SearchApplicant/SearchApplicant";
import Card from "react-bootstrap/Card";
import "./MyAccount.scss";
const MyAccount = () => {
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    let user = window.sessionStorage.getItem("user");
    setUserDetails(JSON.parse(user));
  }, []);
  return (
    <div>
      {userDetails && userDetails.name ? (
        <SearchApplicant pageType="my-account" />
      ) : (
        <Card className="myacccount-card" body>
          <h4>Please login to review your applicantion status</h4>
        </Card>
      )}
    </div>
  );
};
export default MyAccount;
