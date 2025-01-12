import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="sign-in-container auth-container">
      <SignedOut>
        <div className="welcome-message">
          <h1>Welcome to Money Monitor, Your Personal Finance Tracker!</h1>
        </div>
        <div className="auth-buttons">
          <SignUpButton mode="modal" />
          <SignInButton mode="modal" />
        </div>
      </SignedOut>
      <SignedIn>
        <Navigate to="/" />
      </SignedIn>
    </div>
  );
};
