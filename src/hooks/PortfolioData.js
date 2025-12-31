import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function usePortfolioData({ emailId }) {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolioData = async () => {
    setLoading(true);
    try {
      const getCookie = Cookies.get("sessionToken");
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}stock/portfolio?email=${emailId}`,
        {
          headers: {
            Authorization: `Bearer ${getCookie}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      setPortfolio(data);
      setError(null);
    } catch (err) {
      setError("Error fetching portfolio data. Please try again later.");
      // For demo purposes, set mock data when API fails
      setPortfolio({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailId]);

  return { portfolio, loading, error, fetchPortfolioData };
}
