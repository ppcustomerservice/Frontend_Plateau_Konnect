import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import { Outlet } from "react-router-dom";
import { STATUS } from "../utils/constants/common";

const Layout = () => {
  const enums = useSelector((store) => store.enum);
  const user = useSelector((store) => store.user);
  const listing = useSelector((store) => store.listing);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Show loader when any part of the app is loading
  useEffect(() => {
    const isLoading = [enums.status, user.status, listing.status].some(
      (status) => status === STATUS.LOADING
    );
    setLoading(isLoading);
  }, [enums, user, listing]);

  // Inject Google Analytics script once on mount
  useEffect(() => {
    const GA_ID = "G-NX7NZWS0KR";

    if (!window.gtag && !document.getElementById("ga-script")) {
      const script = document.createElement("script");
      script.id = "ga-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", GA_ID);
    }
  }, []);

  // Track page views on every route change
  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-NX7NZWS0KR", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <div className="flex-grow">
        <>
          {loading && <Loader />}
          <Outlet />
        </>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
