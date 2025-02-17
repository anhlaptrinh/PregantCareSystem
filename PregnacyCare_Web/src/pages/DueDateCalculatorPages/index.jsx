import { Outlet } from "react-router-dom";
import Footers from "../../component/Footers";
import Headers from "../../component/Headers";

export default function DueDateCalculatorPages() {
  return (
    <>
        <Headers/>
        <Outlet/>
        <Footers/>
    </>
  )
}
