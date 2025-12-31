import { useState } from "react";
import { Minus, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

const SellStockModal = ({
  isOpen,
  selectedStock,
  onClose,
  onSell,
  isProcessing,
  transactionResult,
}) => {
  const [sellQuantity, setSellQuantity] = useState(1);

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

  const handleSell = () => {
    onSell(sellQuantity);
  };

  const handleClose = () => {
    if (!isProcessing) {
      setSellQuantity(1);
      onClose();
    }
  };

  if (!isOpen || !selectedStock) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-md p-6 shadow-xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold flex items-center mb-4">
          <Minus className="w-5 h-5 mr-2 text-red-400" />
          Sell {selectedStock.symbol} Stock
        </h3>

        {!transactionResult ? (
          <>
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-gray-400 text-sm">Current Price</span>
                  <p className="font-medium">
                    {formatCurrency(selectedStock.currentPrice)}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">You Own</span>
                  <p className="font-medium">{selectedStock.quantity} shares</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Bought At</span>
                  <p className="font-medium">
                    {formatCurrency(selectedStock.boughtPrice)}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">P&L Per Share</span>
                  <p
                    className={`font-medium ${getStatusColor(
                      selectedStock.currentPrice - selectedStock.boughtPrice
                    )}`}
                  >
                    {formatCurrency(
                      selectedStock.currentPrice - selectedStock.boughtPrice
                    )}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-gray-300 text-sm block mb-2">
                  Quantity to Sell
                </label>
                <div className="flex">
                  <button
                    className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-l-md"
                    onClick={() =>
                      setSellQuantity(Math.max(1, sellQuantity - 1))
                    }
                    disabled={isProcessing}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={selectedStock.quantity}
                    value={sellQuantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setSellQuantity(
                        Math.min(selectedStock.quantity, Math.max(1, val))
                      );
                    }}
                    className="bg-gray-800 border-y border-gray-700 text-center py-2 px-4 w-full focus:outline-none text-white"
                    disabled={isProcessing}
                  />
                  <button
                    className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-r-md"
                    onClick={() =>
                      setSellQuantity(
                        Math.min(selectedStock.quantity, sellQuantity + 1)
                      )
                    }
                    disabled={isProcessing}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Total Sale Amount:</span>
                  <span className="font-bold">
                    {formatCurrency(selectedStock.currentPrice * sellQuantity)}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Expected P&L:</span>
                  <span
                    className={getStatusColor(
                      (selectedStock.currentPrice - selectedStock.boughtPrice) *
                        sellQuantity
                    )}
                  >
                    {formatCurrency(
                      (selectedStock.currentPrice - selectedStock.boughtPrice) *
                        sellQuantity
                    )}
                    <span className="text-sm ml-1">
                      (
                      {(
                        (selectedStock.currentPrice /
                          selectedStock.boughtPrice -
                          1) *
                        100
                      ).toFixed(2)}
                      %)
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors text-white"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handleSell}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center text-white"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Minus className="w-4 h-4 mr-2" />
                    Confirm Sell
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              className={`mb-6 p-4 rounded-lg ${
                transactionResult.success
                  ? "bg-green-900/30 border border-green-700"
                  : "bg-red-900/30 border border-red-700"
              }`}
            >
              <div className="flex items-start">
                {transactionResult.success ? (
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium text-white">
                    {transactionResult.success
                      ? "Transaction Successful"
                      : "Transaction Failed"}
                  </p>
                  <p className="text-sm mt-1 text-gray-300">
                    {transactionResult.message}
                  </p>

                  {transactionResult.success && transactionResult.details && (
                    <div className="mt-3 space-y-2 text-sm bg-gray-800/50 p-3 rounded">
                      <div className="flex justify-between">
                        <span>Stock:</span>
                        <span className="font-medium">
                          {transactionResult.details.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span className="font-medium">
                          {transactionResult.details.quantity}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span className="font-medium">
                          {formatCurrency(transactionResult.details.total)}
                        </span>
                      </div>
                    </div>
                  )}

                  {transactionResult.success && (
                    <div className="mt-4 p-3 bg-indigo-900/30 border border-indigo-700 rounded">
                      <div className="text-sm mb-2 font-medium">
                        Updated Account
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-400">New Balance</span>
                          <p className="font-medium">
                            {formatCurrency(transactionResult.newBalance)}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-400">Portfolio Value</span>
                          <p className="font-medium">
                            {formatCurrency(transactionResult.portfolioValue)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors text-white"
              >
                {transactionResult.success ? "Done" : "Close"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SellStockModal;
