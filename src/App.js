import logo from "./logo.svg";
import "./App.scss";
import Header from "./Components/Layout/Header/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import DashboardComponent from "./Components/Dashboard/Dashboard";
import HomeComponent from "./Components/Layout/Home/HomeComponent";
import ReportComponent from "./Components/Reports/Reports";
import YojanaDetailComponent from "./Components/Layout/YojanaDetail/YojanaDetailComponent";
import AdminLoginComponent from "./Components/Common/Login/AdminLoginComponent/AdminLoginComponent";
import { useState } from "react";
import MyAccount from "./Components/Common/MyAccount/MyAccount";

function App() {
  const [isAdmin, setAdmin] = useState(false);
  return (
    <Router>
      <Header isAdmin={isAdmin} />
      <Routes>
        <Route exact path="/" element={<HomeComponent />} />
        <Route
          exact
          path="/admin-login"
          element={<AdminLoginComponent setAdmin={setAdmin} />}
        />
        <Route exact path="/my-account" element={<MyAccount />} />
        <Route exact path="/dashboard" element={<DashboardComponent />} />
        <Route exact path="/reports" element={<ReportComponent />} />
        <Route
          exact
          path="/yojana-detail"
          element={<YojanaDetailComponent />}
        />
        <Route path="/" render={() => <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
