"use client"; // Mark this as a Client Component
import { createContext, useContext, useState, useEffect } from "react";

type PopupContextType = {
  showPopup: (message: string, type?: "warning" | "success") => void;
};

const PopupContext = createContext<PopupContextType>({
  showPopup: () => {}, // Default empty function
});

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [popup, setPopup] = useState<{ message: string; type: string } | null>(
    null
  );

  const showPopup = (message: string, type: "warning" | "success" = "warning") => {
    setPopup({ message, type });
  };

  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => {
        setPopup(null);
      }, 5000);

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
            overflow: "hidden", 
          }}
        >
          {popup.message}
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              height: "3px",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              animation: "moveBar 5s linear forwards", 
            }}
          ></div>
        </div>
      )}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  return useContext(PopupContext);
};
