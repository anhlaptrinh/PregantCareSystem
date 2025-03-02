/* eslint-disable react/prop-types */
import { useEffect } from "react";
import WOW from "wow.js";

const WowProvider = ({ children }) => {
  useEffect(() => {
    const wow = new WOW({ live: false });
    wow.init();
  }, []);

  return <>{children}</>;
};

export default WowProvider;
