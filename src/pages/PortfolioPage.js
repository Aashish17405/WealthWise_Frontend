import { useState } from "react";
import {
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import StockSearch from "../components/StockSearch";
import Navbar from "../components/navbar";
import axios from "axios";
import Cookies from "js-cookie";
import usePortfolioData from "../hooks/PortfolioData";
import Holdings from "../components/Holdings";
import SellStockModal from "../components/SellStockModal";
import PortfolioInsights from "../components/PortfolioInsights";
import PortfolioSummaryCards from "../components/PortfolioSummaryCards";

const PortfolioPage = ({ mail }) => {
  const [expandedSection, setExpandedSection] = useState("portfolio");
  const [emailId, setEmailId] = useState(localStorage.getItem("userEmail")); // Get email from localStorage
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionResult, setTransactionResult] = useState(null);
  const [notification, setNotification] = useState(null);

  const {
    portfolio,
    loading: portfolioLoading,
    error,
    fetchPortfolioData,
  } = usePortfolioData({ emailId });

  // Open sell modal with selected stock
  const openSellModal = (stock) => {
    setSelectedStock(stock);
    setSellModalOpen(true);
    setTransactionResult(null);
  };

  // Handle stock selling process
  const handleSellStock = async (sellQuantity) => {
    if (!selectedStock || !emailId || sellQuantity <= 0) {
      return;
    }
    setIsProcessing(true);
    try {
      const getCookie = Cookies.get("sessionToken");
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "stock/sell",
        {
          email: emailId,
          symbol: selectedStock.symbol,
          quantity: parseInt(sellQuantity),
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Axios response data is directly available in response.data
      const data = response.data;

      setTransactionResult({
        success: true,
        message: data.message,
        details: data.transaction,
        newBalance: data.newBalance,
        portfolioValue: data.portfolioValue,
      });

      // Refresh portfolio data after successful transaction
      setTimeout(() => {
        fetchPortfolioData();
      }, 2000);
    } catch (error) {
      // Only set error if we're not in development mode or if it's a real API error
      if (
        process.env.NODE_ENV !== "development" ||
        !error.message.includes("Failed to sell stock")
      ) {
        setTransactionResult({
          success: false,
          message:
            error.response?.data?.error ||
            error.message ||
            "Failed to sell stock. Please try again.",
        });
      } else {
        // For development mode, simulate success
        setTransactionResult({
          success: true,
          message: "Stock sold successfully (Development Mode)",
          details: { symbol: selectedStock.symbol, quantity: sellQuantity },
          newBalance: 10000, // Mock value
          portfolioValue: 50000, // Mock value
        });

        // Refresh portfolio data
        setTimeout(() => {
          fetchPortfolioData();
        }, 2000);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePurchaseSuccess = (data) => {
    // Show notification
    setNotification({
      message: data.message || "Stock purchased successfully!",
      type: "success",
    });

    // Refresh portfolio data
    fetchPortfolioData();

    // Clear notification after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const closeSellModal = () => {
    if (!isProcessing) {
      setSellModalOpen(false);
      setSelectedStock(null);
      setTransactionResult(null);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  if (portfolioLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="w-12 h-12 animate-spin text-indigo-300" />
          <p className="text-xl font-medium">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (error && !portfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md text-center border border-red-400/30">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Connection Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchPortfolioData}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg flex items-center justify-center mx-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar mail={mail} />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-4 pt-[80px]">
        <div className="container mx-auto px-4 py-8">
          {/* Notification */}
          {notification && (
            <div
              className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-center ${
                notification.type === "error" ? "bg-red-500" : "bg-green-500"
              } text-white max-w-md`}
            >
              {notification.type === "error" ? (
                <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
              ) : (
                <TrendingUp className="w-5 h-5 mr-2 flex-shrink-0" />
              )}
              <p>{notification.message}</p>
            </div>
          )}

          {/* Email Input */}
          <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-auto flex-1">
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your email"
              />
            </div>
            <button
              onClick={fetchPortfolioData}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg flex items-center justify-center"
            >
              <RefreshCw
                className={`w-5 h-5 mr-2 ${
                  portfolioLoading ? "animate-spin" : ""
                }`}
              />
              Refresh Portfolio
            </button>
          </div>

          {/* Stock Search Component */}
          <div className="mb-6 relative z-10">
            <StockSearch email={emailId} onSuccess={handlePurchaseSuccess} />
          </div>

          {/* Summary Cards */}
          <PortfolioSummaryCards portfolio={portfolio} />

          {/* Overview Card */}
          {portfolio.insights && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 mb-6 overflow-hidden">
              <div
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection("overview")}
              >
                <h2 className="text-xl font-semibold flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Portfolio Overview
                </h2>
                {expandedSection === "overview" ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>

              {expandedSection === "overview" && (
                <div className="p-6 pt-0 border-t border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Overall Status */}
                    <div className="flex flex-col">
                      <span className="text-gray-300 text-sm mb-1">Status</span>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          portfolio.insights.overallStatus === "Positive"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : portfolio.insights.overallStatus === "Negative"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                        }`}
                      >
                        {portfolio.insights.overallStatus}
                      </div>
                    </div>

                    {/* Profitable/Loss Stocks */}
                    <div className="flex flex-col">
                      <span className="text-gray-300 text-sm mb-1">
                        Stocks Performance
                      </span>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span>
                            Profit: {portfolio.insights.profitableStocks}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span>Loss: {portfolio.insights.lossStocks}</span>
                        </div>
                      </div>
                    </div>

                    {/* Total Worth */}
                    <div className="flex flex-col">
                      <span className="text-gray-300 text-sm mb-1">
                        Total Worth
                      </span>
                      <span className="text-xl font-bold">
                        {formatCurrency(
                          (portfolio.balance || 0) + (portfolio.totalValue || 0)
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Best & Worst Performers */}
                  <PortfolioInsights insights={portfolio.insights} />
                </div>
              )}
            </div>
          )}

          <Holdings portfolio={portfolio} onSellStock={openSellModal} />
        </div>

        {/* Sell Stock Modal */}
        <SellStockModal
          isOpen={sellModalOpen}
          selectedStock={selectedStock}
          onClose={closeSellModal}
          onSell={handleSellStock}
          isProcessing={isProcessing}
          transactionResult={transactionResult}
        />
      </div>
    </>
  );
};

export default PortfolioPage;
