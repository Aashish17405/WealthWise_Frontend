import React from "react";
import PersonalizeButtons from "./PersonalizeButtons";
import InvestmentCarousel from "./InvestmentCarousel";
import { createFallbackImage } from "../utils/homePageUtils";

const MainDashboard = ({
  stockData,
  mutualFundData,
  fixedDepositData,
  videoDetails,
  logoData,
  investments,
}) => {
  return (
    <div
      className="inset-0 bg-gradient-to-br from-blue-1500/90 to-purple-1500/90 text-white p-4 overflow-hidden w-full"
      style={{
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <PersonalizeButtons />

      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mr-2 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
        Top Investments & Learning
      </h2>

      {investments.map((category, categoryIndex) => (
        <InvestmentCarousel
          key={category.type}
          category={category}
          categoryIndex={categoryIndex}
          stockData={stockData}
          mutualFundData={mutualFundData}
          fixedDepositData={fixedDepositData}
          videoDetails={videoDetails}
          logoData={logoData}
          createFallbackImage={createFallbackImage}
        />
      ))}
    </div>
  );
};

export default MainDashboard;
