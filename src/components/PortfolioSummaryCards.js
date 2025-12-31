import { DollarSign, TrendingUp, Briefcase, PieChart } from "lucide-react";

const PortfolioSummaryCards = ({ portfolio }) => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Balance Card */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-300 font-medium">Cash Balance</h3>
          <DollarSign className="w-5 h-5 text-indigo-300" />
        </div>
        <p className="text-2xl font-bold mt-2">
          {formatCurrency(portfolio.balance || 0)}
        </p>
      </div>

      {/* Portfolio Value Card */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-300 font-medium">Portfolio Value</h3>
          <Briefcase className="w-5 h-5 text-indigo-300" />
        </div>
        <p className="text-2xl font-bold mt-2">
          {formatCurrency(portfolio.totalValue || 0)}
        </p>
      </div>

      {/* Total Investment Card */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-300 font-medium">Total Investment</h3>
          <PieChart className="w-5 h-5 text-indigo-300" />
        </div>
        <p className="text-2xl font-bold mt-2">
          {formatCurrency(
            portfolio.totalInvestment || portfolio.totalValue || 0
          )}
        </p>
      </div>

      {/* Profit/Loss Card */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-300 font-medium">Total P&L</h3>
          <TrendingUp className="w-5 h-5 text-indigo-300" />
        </div>
        <div className="flex items-center mt-2">
          <p
            className={`text-2xl font-bold ${getStatusColor(
              portfolio.insights?.totalProfitLoss || 0
            )}`}
          >
            {formatCurrency(portfolio.insights?.totalProfitLoss || 0)}
          </p>
          <span
            className={`ml-2 text-sm ${getStatusColor(
              portfolio.insights?.overallProfitLossPercentage || 0
            )}`}
          >
            {portfolio.insights?.overallProfitLossPercentage > 0 && "+"}
            {(portfolio.insights?.overallProfitLossPercentage || 0).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummaryCards;
