import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import HomePage from "./components/HomePage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import Profile from "./components/Profile"; // Import the Profile component
// import Navbar from "./components/Navbar"; // Uncomment this if you want to use Navbar

function App() {
  return (
    <Router>
      <div>
        {/* Uncomment and use Navbar if needed */}
        {/* <Navbar /> */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/profile" element={<Profile />} /> {/* Add this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
