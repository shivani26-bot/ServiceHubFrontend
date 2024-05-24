import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation/Navigation";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import CompanySignup from "./components/Signup/CompanySignup/CompanySignup";
import ClientSignup from "./components/Signup/ClientSignup/ClientSignup";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Otp from "./components/Otp/Otp";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home/Home";
import ClientNavigationBar from "./components/Navigation/ClientNavigationBar";
import ClientDashBoard from "./modules/Client/ClientDashBoard/ClientDashBoard";
import ClientBookings from "./modules/Client/ClientBookings/ClientBookings";
import CompanyNavigationBar from "./components/Navigation/CompanyNavigationBar";
import CompanyDashBoard from "./modules/Company/CompanyDashBoard/CompanyDashBoard";
import PostAd from "./components/PostAd/PostAd";
import PostReview from "./components/PostReview/PostReview";

import Services from "./components/Services/Services";
import BookService from "./components/BookService/BookService";
import ViewService from "./components/ViewService/ViewService";
import Logout from "./components/Logout/Logout";
function App() {
  // Since useLocation needs to be used within a Router component, we can't use it directly in the App component. Instead, we need to utilize it within the components that are children of a Router
  return (
    <div>
      <BrowserRouter>
        {/* <ConditionalNavigation /> */}

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

{
  /* <Route path="/*" element={<h1>404 Page Not Found!</h1>} /> */
}

{
  /* <BrowserRouter>
        <CompanyNavigationBar />
        <Routes>
          <Route path="/CompanyDashboard" element={<CompanyDashBoard />} />
          <Route path="/companyPostAd" element={<PostAd />} />
        </Routes>
      </BrowserRouter> */
}
