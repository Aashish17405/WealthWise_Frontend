import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PersonalizeButtons = () => {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeButton === "Track My Spending") {
      navigate("/expensedate");
    } else if (activeButton === "Smart Mutual Funds") {
      navigate("/mf-recommendations");
    } else if (activeButton === "Personalized Safe Deposits") {
      navigate("/fd-recommendations");
    } else if (activeButton === "Stock Picks for Me") {
      navigate("/stock-recommendations");
    }
  }, [activeButton, navigate]);

  const personalizeButtons = [
    {
      name: "Stock Picks for Me",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1116.5 16h-11z" />
        </svg>
      ),
    },
    {
      name: "Personalized Safe Deposits",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm4-1a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Smart Mutual Funds",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1-1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
    },
    {
      name: "Track My Spending",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="grid grid-cols-2 gap-4 mb-6 pb-2 overflow-hidden"
      style={{ marginTop: "90px", marginBottom: "40px" }}
    >
      {personalizeButtons.map((button) => (
        <div
          key={button.name}
          className="relative group transform transition-all duration-500 hover:scale-100"
        >
          <button
            onClick={() => setActiveButton(button.name)}
            className={`w-full bg-white/15 backdrop-blur-lg rounded-2xl p-2 md:p-6 flex flex-col justify-center items-center text-center relative z-10 overflow-hidden min-h-[90px] hover:h-[80px] ${
              activeButton === button.name
                ? "bg-gradient-to-br from-blue-900/50 to-purple-900/90 text-white"
                : "bg-gradient-to-br from-blue-900/90 to-purple-900/50 text-gray-300"
            }`}
          >
            <span className="flex items-center justify-center text-lg font-medium mx-auto relative z-10 transition-all duration-300">
              <span className="flex items-center space-x-2 transition-transform duration-300 group-hover:scale-125">
                {button.icon}
                <span>{button.name}</span>
              </span>
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default PersonalizeButtons;
