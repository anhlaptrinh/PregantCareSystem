import AdvertisementImage from "../../assets/Advertisement.png";
import { ConvertYouTubeURL } from "../ConvertYouTubeURL";

export default function Advertisement() {
  const originalURL = "https://www.youtube.com/watch?v=F_ssj7-8rYg";
  const embedURl = ConvertYouTubeURL(originalURL);
  return (
    <div className="row justify-content-md-center mt-5">
      <div className="col-md-auto">
        <img
          className="shadow p-3 mb-5 bg-body rounded"
          src={AdvertisementImage}
          alt="A picture of Advertisement"
        />
      </div>
      <div className="col-md-auto">
        <iframe
          width="600"
          height="340"
          src={embedURl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
