import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./basic/components/Navigation/Navigation";
import Register from "./basic/components/Register/Register";
import Login from "./basic/components/Login/Login";
import CompanySignup from "./basic/components/Signup/CompanySignup/CompanySignup";
import ClientSignup from "./basic/components/Signup/ClientSignup/ClientSignup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Navigation />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}

          <Route path="/register/*" element={null}>
            <Route path="" element={<Register />}></Route>
            <Route path="companySignup" element={<CompanySignup />} />
            <Route path="clientSignup" element={<ClientSignup />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<h1>404 Page Not Found!</h1>} />
        </Routes>
      </BrowserRouter>

      {/* <Navigation />
      <CompanySignup />
      <ClientSignup /> */}
    </div>
  );
}

export default App;
