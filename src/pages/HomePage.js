import { motion } from "framer-motion";
import "font-awesome/css/font-awesome.min.css";
import Navbar from "../components/navbar.js";
import MainDashboard from "../components/MainDashboard.js";
import logoData from "../data/logos.js";
import useStockData from "../hooks/useStockData";
import useMutualFundData from "../hooks/useMutualFundData";
import useFixedDepositData from "../hooks/useFixedDepositData";
import useVideoData from "../hooks/useVideoData";

const HomePage = ({ mail }) => {
  const stockData = useStockData();
  const mutualFundData = useMutualFundData();
  const fixedDepositData = useFixedDepositData();
  const { videoDetails } = useVideoData();

  // Investment categories data
  const investments = [
    {
      type: "Stocks",
      items: stockData.niftyData,
    },
    {
      type: "Fixed Deposits",
      items: fixedDepositData.fixedDepositsData,
    },
    {
      type: "Mutual Funds",
      items: mutualFundData.mutualFundsData,
    },
    {
      type: "Investment Videos",
      items: [
        {
          id: 0,
          details: "https://youtu.be/fiLVHI8CUZE?si=5fsPZh713j1OsKhP",
        },
        {
          id: 1,
          details: "https://youtu.be/7c4ZJ-ljRMw?si=RfoeTdPrI1xqrSTA",
        },
        {
          id: 2,
          details: "https://youtu.be/-FP7IVNN4bI?si=tF6yy1r7ZsyAxd5b",
        },
        {
          id: 3,
          details: "https://youtu.be/7jvTrxh0kGc?si=xOKMXSjHdb-oaw-X",
        },
        {
          id: 4,
          details: "https://youtu.be/raW2FIPnqIc?si=yGUBkLsnZgYuByhu",
        },
        {
          id: 5,
          details: "https://www.youtube.com/watch?v=lqk2LppTl84&t=228s",
        },
        {
          id: 6,
          details: "https://youtu.be/Q0uXGQu55GM?si=B15Ob4M-WdtP0Sag",
        },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
    >
      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50">
        <Navbar mail={mail} />

        <MainDashboard
          stockData={stockData}
          mutualFundData={mutualFundData}
          fixedDepositData={fixedDepositData}
          videoDetails={videoDetails}
          logoData={logoData}
          investments={investments}
        />
      </div>
    </motion.div>
  );
};

export default HomePage;
