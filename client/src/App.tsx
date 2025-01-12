import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { SignedIn, UserButton, useAuth } from "@clerk/clerk-react";

const App = () => {

  const { isSignedIn } = useAuth();

  return (
    <Router>
      <div className="app-container">
      <SignedIn>
        <div className="navbar">
          <h2>User Options:</h2>
          
          <UserButton />
        </div>
        </SignedIn>
        <Routes>
          <Route
            path="/"
            element={isSignedIn ? (
              <FinancialRecordsProvider>
                <Dashboard />
              </FinancialRecordsProvider>
            ) : (
              <Navigate to="/auth" />
            )}
          />
          <Route path="/auth" element={ <Auth />} />
          <Route
              path="*"
              element={
                  <Navigate to="/auth" />
              }
            />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
