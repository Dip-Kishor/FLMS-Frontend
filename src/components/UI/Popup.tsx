"use client"; // Mark this as a Client Component
import { createContext, useContext, useState, useEffect } from "react";

// Define the type for the context value
type PopupContextType = {
  showPopup: (message: string, type?: "warning" | "success") => void;
};

// Create a context for the popup with a default value
const PopupContext = createContext<PopupContextType>({
  showPopup: () => {}, // Default empty function
});

// Provider component to wrap your app or specific parts of it
export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [popup, setPopup] = useState<{ message: string; type: string } | null>(
    null
  );

  const showPopup = (message: string, type: "warning" | "success" = "warning") => {
    setPopup({ message, type });
  };

  useEffect(() => {
    if (popup) {
      // Automatically hide the popup after 3 seconds
      const timer = setTimeout(() => {
        setPopup(null);
      }, 5000);

      // Cleanup the timer
      return () => clearTimeout(timer);
    }
  }, [popup]);

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      {popup && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "15px",
            borderRadius: "5px",
            backgroundColor: popup.type === "warning" ? "#FF5733 " : "#00C851",
            color: "white",
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            animation: "slideIn 0.5s ease-out",
            overflow: "hidden", // Ensures the moving bar stays within the popup
          }}
        >
          {popup.message}
          {/* Moving bar at the bottom */}
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              height: "3px",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              animation: "moveBar 5s linear forwards", // Matches the 3-second duration
            }}
          ></div>
        </div>
      )}
    </PopupContext.Provider>
  );
};

// Custom hook to use the popup
export const usePopup = () => {
  return useContext(PopupContext);
};