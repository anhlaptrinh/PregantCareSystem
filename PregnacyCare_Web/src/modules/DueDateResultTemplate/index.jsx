import Advertisement from "../../component/Advertisement";
import Result from "./Result";

export default function DueDateCalculatorResultTemplate() {
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col">
            <Result />
          </div>
          <div class="col">
            <Advertisement />
          </div>
        </div>
      </div>
    </>
  );
}
