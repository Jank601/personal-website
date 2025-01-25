import "@/styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ReactGA from "react-ga4";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const trackingId = process.env.REACT_APP_GA_TRACKING_ID;

    if (trackingId) {
      ReactGA.initialize(trackingId);
      console.log("Google Analytics initialized with Tracking ID:", trackingId);

      // Track the initial page load
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });

      // Track page views on route changes
      const handleRouteChange = (url) => {
        ReactGA.send({ hitType: "pageview", page: url });
        console.log("Pageview event sent for:", url);
      };

      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    } else {
      console.error("Google Analytics tracking ID is not defined.");
    }
  }, [router.events]);

  return <Component {...pageProps} />;
}