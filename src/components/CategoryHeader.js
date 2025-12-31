import React from "react";

const CategoryHeader = ({
  categoryType,
  isLoading,
  lastUpdated,
  onRefresh,
  formatLastUpdated,
}) => {
  const getRefreshIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );

  const renderRefreshSection = () => {
    if (!onRefresh) return null;

    return (
      <div className="flex items-center text-sm">
        <span className="text-gray-300 mr-2">
          Last updated: {lastUpdated ? formatLastUpdated(lastUpdated) : "Never"}
        </span>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {getRefreshIcon()}
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
    );
  };

  return (
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold text-bg-gradient-to-br from-blue-900/90 to-purple-900/50">
        {categoryType}
      </h3>
      {renderRefreshSection()}
    </div>
  );
};

export default CategoryHeader;
