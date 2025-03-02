import { Outlet } from "react-router-dom";
import Footers from "../../component/Footers";
import Headers from "../../component/Headers";

export default function HomePages() {
  return (
    <>
      <Headers />
      <Outlet />
      <Footers />
    </>
  );
}
