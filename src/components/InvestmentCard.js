import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

const cld = new Cloudinary({ cloud: { cloudName: "djlgmbop9" } });

const InvestmentCard = ({ item, index, type, images, createFallbackImage }) => {
  const bgIntensity = Math.max(700 - index * 50, 800);

  const getStatusInfo = () => {
    switch (type) {
      case "stocks":
        const isStockUp = parseFloat(item.change) > 0;
        const changeValue = (
          parseFloat(item.ltp) - parseFloat(item.prev_price)
        ).toFixed(2);
        return {
          color: isStockUp ? "text-green-500" : "text-red-500",
          icon: isStockUp ? "▲" : "▼",
          value: `${changeValue} (${item.change}%)`,
          subtitle: `₹${item.ltp}`,
        };

      case "mutualFunds":
        const isPositive = parseFloat(item.return) > 0;
        return {
          color: isPositive ? "text-green-500" : "text-red-500",
          icon: isPositive ? "▲" : "▼",
          value: `${item.return}% (annual)`,
          subtitle: item.code,
        };

      case "fixedDeposits":
        const isHighReturn = parseFloat(item.return) >= 7.0;
        return {
          color: isHighReturn ? "text-green-500" : "text-yellow-500",
          icon: isHighReturn ? "★" : "•",
          value: `${item.return}% interest`,
          subtitle: item.code,
        };

      default:
        return {
          color: "text-gray-400",
          icon: "•",
          value: "",
          subtitle: "",
        };
    }
  };

  const getImageElement = () => {
    const statusInfo = getStatusInfo();
    const imageKey = type === "stocks" ? item.symbol : item.name;
    const cloudinaryId = images[imageKey];

    const getDomainMapping = () => {
      if (type === "stocks") {
        const tickerToDomain = {
          RELIANCE: "ril.com",
          TCS: "tcs.com",
          HDFCBANK: "hdfcbank.com",
          INFY: "infosys.com",
          ICICIBANK: "icicibank.com",
          SBIN: "sbi.co.in",
          BHARTIARTL: "airtel.in",
          TATAMOTORS: "tatamotors.com",
        };
        return (
          tickerToDomain[item.symbol] || `${item.symbol.toLowerCase()}.com`
        );
      } else if (type === "mutualFunds") {
        const cleanName = item.name.toLowerCase().replace(/\s+/g, "");
        return `${cleanName}.com`;
      } else if (type === "fixedDeposits") {
        const cleanName = item.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .replace("ltd.", "");
        return `${cleanName}.com`;
      }
      return "";
    };

    const fallbackDomain = getDomainMapping();

    try {
      if (cloudinaryId) {
        const img = cld
          .image(cloudinaryId)
          .format("auto")
          .quality("auto")
          .resize(
            auto()
              .gravity(autoGravity())
              .width(500)
              .height(500)
          );

        return (
          <AdvancedImage
            className="w-10 h-10 object-contain rounded-full"
            cldImg={img}
            onError={(e) => {
              e.target.onerror = null;
              if (fallbackDomain === "bajaj.com") {
                e.target.src =
                  "https://ui-avatars.com/api/?name=Bajaj&background=random&size=128";
              } else {
                e.target.src = `https://logo.clearbit.com/${fallbackDomain}`;
              }
              e.target.addEventListener("error", () => {
                e.target.src = createFallbackImage(
                  imageKey,
                  type === "stocks"
                    ? "stock"
                    : type === "mutualFunds"
                    ? "mf"
                    : type === "fixedDeposits"
                    ? "fd"
                    : type
                );
              });
            }}
          />
        );
      } else {
        throw new Error("Cloudinary ID not found");
      }
    } catch (err) {
      return (
        <img
          src={
            fallbackDomain === "bajaj.com"
              ? "https://ui-avatars.com/api/?name=Bajaj&background=random&size=128"
              : `https://logo.clearbit.com/${fallbackDomain}`
          }
          className="w-10 h-10 object-contain rounded-full"
          alt={imageKey}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = createFallbackImage(
              imageKey,
              type === "stocks"
                ? "stock"
                : type === "mutualFunds"
                ? "mf"
                : type === "fixedDeposits"
                ? "fd"
                : type
            );
          }}
        />
      );
    }
  };

  const statusInfo = getStatusInfo();
  const displayName = type === "stocks" ? item.symbol : item.name;

  return (
    <div
      key={displayName}
      className={`flex-shrink-0 w-64 bg-gradient-to-br from-blue-1500/90 to-purple-1500/90${bgIntensity} rounded-lg p-4 
      transform transition-all duration-300 
      hover:scale-105 hover:shadow-lg
      scroll-snap-align: start;`}
      style={{ scrollSnapAlign: "start" }}
      onClick={() => window.open(item.link, "_blank")}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h4 className="font-bold text-lg leading-tight">{displayName}</h4>
          <div className="flex flex-col">
            <p className="text-sm text-gray-400">{statusInfo.subtitle}</p>
            <p className={`text-sm ${statusInfo.color} flex items-center`}>
              {statusInfo.icon} {statusInfo.value}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md overflow-hidden">
          {getImageElement()}
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;
