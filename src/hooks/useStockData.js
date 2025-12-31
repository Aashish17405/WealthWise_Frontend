import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import nifty50Data from "../data/niftyData.js";

const useStockData = () => {
  const [niftyData, setNiftyData] = useState(nifty50Data);
  const [isLoadingStocks, setIsLoadingStocks] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const navigate = useNavigate();

  // Fetch stock data function
  const fetchStockData = async () => {
    setIsLoadingStocks(true);

    try {
      const getCookie = Cookies.get("sessionToken");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}nifty50`,
        {
          params: { count: 20 },
          headers: {
            Authorization: `Bearer ${getCookie}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Process the response data to match the expected format
      const processedData = response.data.map((stock) => ({
        symbol: stock.symbol,
        name: stock.symbol, // You might want to map this to full company names
        sector: "NIFTY 50", // Since it's NIFTY 50 data
        open_price: stock.change || "0",
        high_price: stock.high || "0",
        low_price: stock.low || "0",
        ltp: stock.lastPrice || "0",
        prev_price: stock.previousClose || "0",
        change: stock.percentChange || "0",
        link: `https://www.nseindia.com/get-quotes/equity?symbol=${encodeURIComponent(
          stock.symbol
        )}`,
      }));

      setNiftyData(processedData);
      setLastUpdated(new Date());
    } catch (error) {
      if (
        error.response?.data?.error === "invalid token" ||
        error.response?.data?.error === "Unauthorized request"
      ) {
        localStorage.removeItem("sessionToken");
        localStorage.removeItem("userEmail");
        navigate("/", { replace: true });
      }
      console.error("Error fetching stock data:", error);
      // Don't update with fallback data since we already have static data loaded
    } finally {
      setIsLoadingStocks(false);
    }
  };

  // Function to manually refresh stock data
  const refreshStockData = () => {
    fetchStockData();
  };

  // Format the last updated time
  const formatLastUpdated = (date = lastUpdated) => {
    if (!date) return "Never";

    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;

    return date.toLocaleString();
  };

  // Auto-fetch on mount and set up refresh interval
  useEffect(() => {
    fetchStockData();

    // Refresh stock data every 5 minutes
    const stockDataRefreshInterval = setInterval(() => {
      fetchStockData();
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(stockDataRefreshInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    niftyData,
    isLoadingStocks,
    lastUpdated,
    refreshStockData,
    formatLastUpdated,
  };
};

export default useStockData;
