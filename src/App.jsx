import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import CompanySignup from "./components/Signup/CompanySignup/CompanySignup";
import ClientSignup from "./components/Signup/ClientSignup/ClientSignup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Otp from "./components/Otp/Otp";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/Home";

import ClientDashBoard from "./modules/Client/ClientDashBoard/ClientDashBoard";
import ClientBookings from "./modules/Client/ClientBookings/ClientBookings";

import CompanyDashBoard from "./modules/Company/CompanyDashBoard/CompanyDashBoard";
import PostAd from "./components/PostAd/PostAd";
import PostReview from "./components/PostReview/PostReview";

import Services from "./components/Services/Services";

import ViewService from "./components/ViewService/ViewService";
import Logout from "./components/Logout/Logout";

import AdminSignup from "./components/Admin/AdminSignup";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashBoard from "./components/Admin/AdminDashboard";
import AdminLogout from "./components/Admin/AdminLogout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register/*" element={null}>
            <Route path="" element={<Register />}></Route>
            <Route path="companySignup" element={<CompanySignup />} />
            <Route path="companySignup/otp" element={<Otp />} />
            <Route path="clientSignup" element={<ClientSignup />} />
            <Route path="clientSignup/otp" element={<Otp />} />
          </Route>

          <Route path="/login" element={<Login />} />

          <Route path="/clientDashboard" element={<ClientDashBoard />} />
          <Route path="/clientBookings" element={<ClientBookings />} />
          <Route path="/companyDashboard" element={<CompanyDashBoard />} />
          <Route path="/companyPostAd" element={<PostAd />} />
          <Route path="/companyAds" element={<Services />} />
          <Route path="/clientLogout" element={<Logout />} />
          <Route path="/companyLogout" element={<Logout />} />
          <Route
            path="/postReview/:bookId/:serviceId/:userId"
            element={<PostReview />}
          />
          <Route path="/client/viewAd/:serviceId" element={<ViewService />} />
          <Route path="/adminLogin" element={<AdminLogin />} />

          <Route path="/adminRegister" element={<AdminSignup />} />

          <Route path="/adminDashboard" element={<AdminDashBoard />} />
          <Route path="/adminLogout" element={<AdminLogout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
