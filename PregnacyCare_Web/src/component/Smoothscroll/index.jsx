
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const SmoothScrollWrapper = ({ children }) => {
  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      window.scrollBy({
        top: event.deltaY * 10, // Điều chỉnh tốc độ cuộn
        behavior: "smooth",
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return <div>{children}</div>;
};

export default SmoothScrollWrapper;

