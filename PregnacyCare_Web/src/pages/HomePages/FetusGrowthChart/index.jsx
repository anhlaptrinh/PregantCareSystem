import FetusRecord from "../../../modules/FetusTrackerTemplate/FetusRecord";
import GrowthChart from "../../../modules/FetusTrackerTemplate/GrowthChart";
import NotificationFetus from "../../../modules/FetusTrackerTemplate/Notification";

export default function FetusGrowthChart() {
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div
            className="col"
            style={{
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NotificationFetus />
          </div>
          <div className="col" style={{ height: "100vh" }}>
            <GrowthChart />
            <FetusRecord />
          </div>
        </div>
      </div>
    </div>
  );
}
