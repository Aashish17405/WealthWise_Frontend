import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Minus,
} from "lucide-react";
import { useState } from "react";

export default function Holdings({ portfolio, onSellStock }) {
  const [expandedSection, setExpandedSection] = useState("portfolio");

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getStatusColor = (value) => {
    if (value > 0) return "text-green-500";
    if (value < 0) return "text-red-500";
    return "text-gray-400";
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const openSellModal = (stock) => {
    if (onSellStock) {
      onSellStock(stock);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 mb-6 overflow-hidden">
      <div
        className="p-6 cursor-pointer flex justify-between items-center"
        onClick={() => toggleSection("portfolio")}
      >
        <h2 className="text-xl font-semibold flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Portfolio Holdings
        </h2>
        {expandedSection === "portfolio" ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </div>

      {expandedSection === "portfolio" && (
        <div className="overflow-x-auto">
          {portfolio.portfolio && portfolio.portfolio.length > 0 ? (
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr className="text-sm text-gray-300">
                  <th className="py-3 px-6 text-left">Stock</th>
                  <th className="py-3 px-6 text-right">Quantity</th>
                  <th className="py-3 px-6 text-right">Bought Price</th>
                  <th className="py-3 px-6 text-right">Current Price</th>
                  <th className="py-3 px-6 text-right">Value</th>
                  <th className="py-3 px-6 text-right">P&L</th>
                  <th className="py-3 px-6 text-right">P&L %</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.portfolio.map((stock, index) => (
                  <tr
                    key={stock.symbol}
                    className={`${
                      index !== portfolio.portfolio.length - 1
                        ? "border-b border-white/10"
                        : ""
                    } hover:bg-white/5`}
                  >
                    <td className="py-4 px-6 font-medium">{stock.symbol}</td>
                    <td className="py-4 px-6 text-right">{stock.quantity}</td>
                    <td className="py-4 px-6 text-right">
                      {formatCurrency(stock.boughtPrice)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end">
                        {formatCurrency(stock.currentPrice)}
                        {stock.currentPrice > stock.boughtPrice && (
                          <ArrowUp className="ml-1 w-4 h-4 text-green-400" />
                        )}
                        {stock.currentPrice < stock.boughtPrice && (
                          <ArrowDown className="ml-1 w-4 h-4 text-red-400" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right font-medium">
                      {formatCurrency(stock.value)}
                    </td>
                    <td
                      className={`py-4 px-6 text-right font-medium ${getStatusColor(
                        stock.profitLoss
                      )}`}
                    >
                      {stock.profitLoss > 0 && "+"}
                      {formatCurrency(stock.profitLoss)}
                    </td>
                    <td
                      className={`py-4 px-6 text-right ${getStatusColor(
                        stock.profitLossPercentage
                      )}`}
                    >
                      {stock.profitLossPercentage > 0 && "+"}
                      {stock.profitLossPercentage.toFixed(2)}%
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => openSellModal(stock)}
                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded inline-flex items-center text-sm transition-colors"
                      >
                        <Minus className="w-3 h-3 mr-1" />
                        Sell
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-300">
                Your portfolio is empty. Start investing to see your holdings
                here.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
