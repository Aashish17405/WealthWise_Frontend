import React, { useRef, useEffect } from "react";
import CategoryHeader from "./CategoryHeader";
import InvestmentCard from "./InvestmentCard";
import VideoCard from "./VideoCard";

const InvestmentCarousel = ({
  category,
  categoryIndex,
  stockData,
  mutualFundData,
  fixedDepositData,
  videoDetails,
  logoData,
  createFallbackImage,
}) => {
  const scrollContainerRef = useRef(null);

  // Reset scroll position when data is refreshed for the current category
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [
    category.type === "Stocks" ? stockData?.niftyData : null,
    category.type === "Mutual Funds" ? mutualFundData?.mutualFundsData : null,
    category.type === "Fixed Deposits"
      ? fixedDepositData?.fixedDepositsData
      : null,
    category.type === "Stocks" ? stockData?.lastUpdated : null,
    category.type === "Mutual Funds" ? mutualFundData?.lastUpdatedMF : null,
    category.type === "Fixed Deposits" ? fixedDepositData?.lastUpdatedFD : null,
  ]);
  const renderInvestmentItems = () => {
    if (category.type === "Stocks") {
      const { niftyData, isLoadingStocks } = stockData;
      return niftyData
        .sort((a, b) => parseFloat(b.change) - parseFloat(a.change))
        .map((stock, index) => (
          <InvestmentCard
            key={stock.symbol}
            item={stock}
            index={index}
            type="stocks"
            images={logoData.stockImages}
            createFallbackImage={createFallbackImage}
          />
        ));
    } else if (category.type === "Mutual Funds") {
      const { mutualFundsData, isLoadingMF } = mutualFundData;
      return mutualFundsData
        .sort((a, b) => parseFloat(b.return) - parseFloat(a.return))
        .map((fund, index) => (
          <InvestmentCard
            key={fund.name}
            item={fund}
            index={index}
            type="mutualFunds"
            images={logoData.mfImages}
            createFallbackImage={createFallbackImage}
          />
        ));
    } else if (category.type === "Fixed Deposits") {
      const { fixedDepositsData, isLoadingFD } = fixedDepositData;
      return fixedDepositsData
        .sort((a, b) => parseFloat(b.return) - parseFloat(a.return))
        .map((fd, index) => (
          <InvestmentCard
            key={fd.name}
            item={fd}
            index={index}
            type="fixedDeposits"
            images={logoData.fdImages}
            createFallbackImage={createFallbackImage}
          />
        ));
    } else {
      // For video categories
      return category.items
        .map((investment, index) => {
          if (
            investment.id !== undefined &&
            videoDetails &&
            videoDetails[investment.id]
          ) {
            return (
              <VideoCard
                key={investment.id}
                video={videoDetails[investment.id]}
                index={index}
              />
            );
          }
          return null;
        })
        .filter(Boolean);
    }
  };

  const getCategoryProps = () => {
    switch (category.type) {
      case "Stocks":
        return {
          isLoading: stockData.isLoadingStocks,
          lastUpdated: stockData.lastUpdated,
          onRefresh: stockData.refreshStockData,
          formatLastUpdated: stockData.formatLastUpdated,
        };
      case "Mutual Funds":
        return {
          isLoading: mutualFundData.isLoadingMF,
          lastUpdated: mutualFundData.lastUpdatedMF,
          onRefresh: mutualFundData.refreshMutualFundData,
          formatLastUpdated: mutualFundData.formatLastUpdatedMF,
        };
      case "Fixed Deposits":
        return {
          isLoading: fixedDepositData.isLoadingFD,
          lastUpdated: fixedDepositData.lastUpdatedFD,
          onRefresh: fixedDepositData.refreshFixedDepositData,
          formatLastUpdated: fixedDepositData.formatLastUpdatedFD,
        };
      default:
        return {};
    }
  };

  const categoryProps = getCategoryProps();

  return (
    <div key={category.type} className="mb-6" style={{ userSelect: "none" }}>
      <style>
        {`
          ::-webkit-scrollbar {
            width: 2px;
            height: 2px;
          }
          ::-webkit-scrollbar:horizontal {
            width: 2px;
            height: 2px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom right, rgba(0, 0, 255, 0.9), rgba(128, 0, 128, 0.9));
            border-radius: 3px;
          }
    
          ::-webkit-scrollbar-thumb:hover {
            background-color: #666; 
          }
    
          ::-webkit-scrollbar-track {
            background-color: linear-gradient(to bottom right, rgba(0, 0, 255, 0.9), rgba(128, 0, 128, 0.9));
            border-radius: 3px;
          }
        `}
      </style>

      <CategoryHeader categoryType={category.type} {...categoryProps} />

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide whitespace-nowrap scroll-smooth overflow-hidden"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {renderInvestmentItems()}
      </div>
    </div>
  );
};

export default InvestmentCarousel;
