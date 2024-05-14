import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation/Navigation";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import CompanySignup from "./components/Signup/CompanySignup/CompanySignup";
import ClientSignup from "./components/Signup/ClientSignup/ClientSignup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navigation />

        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<PostReview />} />
          <Route path="/register/*" element={null}>
            <Route path="" element={<Register />}></Route>
            <Route path="companySignup" element={<CompanySignup />} />
            <Route path="companySignup/otp" element={<Otp />} />
            <Route path="clientSignup" element={<ClientSignup />} />
            <Route path="clientSignup/otp" element={<Otp />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

      {/* <BrowserRouter>
        <ClientNavigationBar />
        <Routes> */}
      {/* <Route path="/clientDashboard" element={<ClientDashBoard />} /> */}

      {/* <Route path="/clientBookings" element={<ClientBookings />} />
        </Routes>
      </BrowserRouter> */}

      {/* <BrowserRouter>
        <CompanyNavigationBar />
        <Routes>
          <Route path="/CompanyDashboard" element={<CompanyDashBoard />} />
          <Route path="/companyPostAd" element={<PostAd />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;

{
  /* <Route path="/*" element={<h1>404 Page Not Found!</h1>} /> */
}
