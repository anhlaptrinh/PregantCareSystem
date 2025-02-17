import Advertisement from "../../component/Advertisement";
import Calculator from "./Calculator";
import Content from "./Content";

export default function DueDateCalculatorTemplate() {
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col">
            <Calculator />
            <Content />
          </div>
          <div class="col">
            <Advertisement />
          </div>
        </div>
      </div>
    </>
  );
}
