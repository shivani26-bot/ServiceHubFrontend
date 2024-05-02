import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./basic/components/Navigation/Navigation";
import Register from "./basic/components/Register/Register";
import Login from "./basic/components/Login/Login";
import CompanySignup from "./basic/components/Signup/CompanySignup/CompanySignup";
import ClientSignup from "./basic/components/Signup/ClientSignup/ClientSignup";
function App() {
  return (
    <div>
      <Navigation />
      <Register />
      <Login />
      <CompanySignup />
      <ClientSignup />
    </div>
  );
}

export default App;
