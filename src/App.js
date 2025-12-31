import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import Psinfo from "./components/Psinfo";
import FileUpload from "./pages/FileUploadPage";
import PageNotFound from "./pages/PageNotFound";
import PersonalFDRecommendation from "./pages/FDRecommendationPage";
import ExpenseDate from "./pages/ExpenseDatePage";
import ExpenseTrackerPage from "./pages/ExpenseTrackerPage";
import Cookies from "js-cookie";
import ChatBotPage from "./pages/ChatPage";
import MutualFundRecommendationPage from "./pages/MutualFundRecommendationPage";
import PortfolioPage from "./pages/PortfolioPage";
import StockRecommendationPage from "./pages/StockRecommendationPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [log, setLog] = useState(false);
  const [mail, setMail] = useState(localStorage.getItem("userEmail") || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("sessionToken");

  // useEffect(() => {
  //   const token = Cookies.get('sessionToken');
  //   const email = localStorage.getItem('userEmail');
  //   console.log(window.location.pathname);
  //   if (token && email && window.location.pathname === '/') {
  //     navigate('/home');
  //   }
  // }, [navigate]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        setLoading(true);
        if (user) {
          setMail(user.email);
          localStorage.setItem("userEmail", user.email);
          // Only navigate if on login page
          if (window.location.pathname === "/") {
            navigate("/home", { replace: true });
          }
        } else {
          setMail("");
          localStorage.removeItem("userEmail");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error during authentication state change:", error);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []); // Empty dependency array - only run once on mount

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <style>
        {`
            .grecaptcha-badge {
            visibility: hidden;
            }
        `}
      </style>
      <Routes>
        <Route
          path="/"
          element={<LoginPage user1={setLog} email={setMail} />}
        />
        <Route
          path="*"
          element={
            <ProtectedRoute mail={mail}>
              <PageNotFound />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute mail={mail}>
              <HomePage mail={mail} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/form"
          element={
            <ProtectedRoute mail={mail}>
              <Psinfo mail={mail} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute mail={mail}>
              <ChatBotPage mail={mail} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fileupload"
          element={
            <ProtectedRoute mail={mail}>
              {mail === "anuragnarsingoju@gmail.com" ||
              mail === "nagasaipraneeth5@gmail.com" ||
              mail === "aashish17405@gmail.com" ||
              mail === "abhigxtheupm@gmail.com" ? (
                <FileUpload mail={mail} />
              ) : (
                <PageNotFound />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/mf-recommendations"
          element={
            <ProtectedRoute mail={mail}>
              <MutualFundRecommendationPage mail={mail} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fd-recommendations"
          element={
            <ProtectedRoute mail={mail}>
              <PersonalFDRecommendation mail={mail} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expensedate"
          element={
            <ProtectedRoute mail={mail}>
              <ExpenseDate mail={mail} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenseTracker"
          element={
            <ProtectedRoute mail={mail}>
              <ExpenseTrackerPage mail={mail} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stock-recommendations"
          element={
            <ProtectedRoute mail={mail}>
              <StockRecommendationPage mail={mail} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portfolio"
          element={
            <ProtectedRoute mail={mail}>
              <PortfolioPage mail={mail} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
