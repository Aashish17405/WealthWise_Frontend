import { Award, XCircle } from "lucide-react";

const PortfolioInsights = ({ insights }) => {
  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Get status color based on profit/loss
  const getStatusColor = (value) => {
    if (value > 0) return "text-green-500";
    if (value < 0) return "text-red-500";
    return "text-gray-400";
  };

  if (!insights) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {/* Best Performer */}
      {insights.bestPerformer && (
        <div className="bg-white/5 rounded-lg p-4 border border-green-500/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium flex items-center">
              <Award className="w-4 h-4 mr-2 text-green-400" />
              Best Performer
            </h3>
            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
              {insights.bestPerformer.symbol}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-400">Bought</span>
              <p>{formatCurrency(insights.bestPerformer.boughtPrice)}</p>
            </div>
            <div>
              <span className="text-gray-400">Current</span>
              <p>{formatCurrency(insights.bestPerformer.currentPrice)}</p>
            </div>
            <div>
              <span className="text-gray-400">P&L</span>
              <p className={getStatusColor(insights.bestPerformer.profitLoss)}>
                {formatCurrency(insights.bestPerformer.profitLoss)}
              </p>
            </div>
            <div>
              <span className="text-gray-400">P&L %</span>
              <p
                className={getStatusColor(
                  insights.bestPerformer.profitLossPercentage
                )}
              >
                {insights.bestPerformer.profitLossPercentage > 0 && "+"}
                {insights.bestPerformer.profitLossPercentage.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Worst Performer */}
      {insights.worstPerformer && (
        <div className="bg-white/5 rounded-lg p-4 border border-red-500/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium flex items-center">
              <XCircle className="w-4 h-4 mr-2 text-red-400" />
              Worst Performer
            </h3>
            <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">
              {insights.worstPerformer.symbol}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-400">Bought</span>
              <p>{formatCurrency(insights.worstPerformer.boughtPrice)}</p>
            </div>
            <div>
              <span className="text-gray-400">Current</span>
              <p>{formatCurrency(insights.worstPerformer.currentPrice)}</p>
            </div>
            <div>
              <span className="text-gray-400">P&L</span>
              <p className={getStatusColor(insights.worstPerformer.profitLoss)}>
                {formatCurrency(insights.worstPerformer.profitLoss)}
              </p>
            </div>
            <div>
              <span className="text-gray-400">P&L %</span>
              <p
                className={getStatusColor(
                  insights.worstPerformer.profitLossPercentage
                )}
              >
                {insights.worstPerformer.profitLossPercentage > 0 && "+"}
                {insights.worstPerformer.profitLossPercentage.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioInsights;
