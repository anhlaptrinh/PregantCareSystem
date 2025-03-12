<<<<<<< HEAD
import FetusRecord from "../../../modules/FetusTrackerTemplate/FetusRecord";
=======
import AdviceForm from "../../../modules/FetusTrackerTemplate/AdviceForm";
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
import GrowthChart from "../../../modules/FetusTrackerTemplate/GrowthChart";
import NotificationFetus from "../../../modules/FetusTrackerTemplate/Notification";

export default function FetusGrowthChart() {
<<<<<<< HEAD
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
=======
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col" style={{ height: "100vh" }}>
                        <GrowthChart />
                        <AdviceForm />
                    </div>
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
                </div>
            </div>
        </div>
    );
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
}
