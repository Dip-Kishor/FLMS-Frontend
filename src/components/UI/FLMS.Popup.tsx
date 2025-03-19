"use client"; // Mark this as a Client Component
import { createContext, useContext, useState } from "react";

type PopupContextType = {
  showFlmsPopup: (
    message: string,
    type?: "warning" | "success",
    redirectUrl?: string
  ) => void;
};

const PopupContext = createContext<PopupContextType>({
    showFlmsPopup: () => {}, // Default empty function
});

export const FlmsPopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [popup, setPopup] = useState<{
    message: string;
    type: string;
    redirectUrl?: string;
  } | null>(null);

  const showFlmsPopup = (
    message: string,
    type: "warning" | "success" = "warning",
    redirectUrl?: string
  ) => {
    setPopup({ message, type, redirectUrl });
  };

  const closePopup = () => {
    if (popup?.redirectUrl) {
      window.location.href = popup.redirectUrl; // Redirect to the specified URL
    }
    setPopup(null); // Close the popup
  };

  return (
    <PopupContext.Provider value={{ showFlmsPopup }}>
      {children}
      {popup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "8px",
              boxShadow: "rgba(45, 20, 28, 10) 8px 10px 14px",
              textAlign: "center",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <p>{popup.message}</p>
            <button
              onClick={closePopup}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                backgroundColor: popup.type === "warning" ? "#FF5733" : "#00C851",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
};

export const useFlmsPopup = () => {
  return useContext(PopupContext);
};