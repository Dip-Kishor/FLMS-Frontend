"use client";

import { useEffect } from "react";

const SessionChecker = () => {
  useEffect(() => {
    checkSessionExpiry();
  }, []);

  return null; // No UI needed, just runs the check
};

const checkSessionExpiry = () => {
  if (typeof window !== "undefined") {
    const expiryTime = sessionStorage.getItem("token_expiry");
    if (expiryTime && Date.now() > parseInt(expiryTime)) {
      sessionStorage.clear();
      console.log("Session expired. Redirecting to login...");
      window.location.href = "/auth/login"; // Redirect to login page
    }
  }
};

export default SessionChecker;
