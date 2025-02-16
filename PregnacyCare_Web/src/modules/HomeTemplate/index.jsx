import Aboutus from "./About";
import Appointment from "./Appoinment";
import Carousel from "./Carousel";
import Pricing from "./Pricing";
import ShortServices from "./ShortServices";
import Srvice from "./Srvice";
import Testimonials from "./Testimonials";
import WhyChoose from "./Whychoose";

export default function HomeTemplate() {
  return (
    <>
        <Carousel/>
        <ShortServices/>
        <Aboutus/>
        <Srvice/>
        <WhyChoose/>
        <Pricing/>
        <Testimonials/>
        <Appointment/>
    </>
  )
}
