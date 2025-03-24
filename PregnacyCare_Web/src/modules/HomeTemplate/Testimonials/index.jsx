import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import { useGetAllExperts } from "../../../apis/CallAPIUser";
import { useGetImageUrl } from "../../../apis/CallAPIFirebase";
import qoutes from "../../../assets/images/testimonials/quotes.png";
import avatar from "../../../assets/PregnantAvatar.jpg";
import { Link } from "react-router-dom";
import { Box, Skeleton } from "@mui/material";

export default function Testimonials() {
  // Hàm fetch danh sách experts, kèm việc lấy ảnh từ Firebase cho từng expert
  const fetchAllExperts = async () => {
    const res = await useGetAllExperts();
    if (res.code === 200 && res.data) {
      const expertsWithImage = await Promise.all(
        res.data.map(async (expert) => {
          let imageUrl = null;
          try {
            imageUrl = await useGetImageUrl(
              "pregnancyCareImages/users",
              expert.id
            );
          } catch (error) {
            console.error(
              `Error fetching image for expert ${expert.id}:`,
              error
            );
          }
          return { ...expert, image: imageUrl ? imageUrl : avatar };
        })
      );
      return expertsWithImage;
    }
    throw new Error("Error fetching experts");
  };

  // Sử dụng useQuery để lưu dữ liệu vào cache. Nếu đã có, sẽ không gọi lại API.
  const {
    data: experts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["experts"],
    queryFn: fetchAllExperts,
    staleTime: 1000 * 60 * 5, // Dữ liệu fresh trong 5 phút
  });

  // Hiển thị Skeleton khi đang loading
  if (isLoading) {
    return (
      <Box sx={{ padding: 4, width: "50%", margin: "0 auto" }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={300}
          sx={{ borderRadius: 2, mb: 4 }}
        />
        <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Box>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="rts-testimonials-area rts-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="title-area-center">
              <h2 className="title text-center">
                Words from Our <br /> Patients
              </h2>
            </div>
          </div>
        </div>
        <div className="row mt--0 g-5">
          <div className="col-lg-12">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              loop={true}
            >
              {experts.map((expert) => (
                <SwiperSlide key={expert.id}>
                  <div className="single-testimonials-style">
                    <div className="quots">
                      <img src={qoutes} alt="testimonials" />
                    </div>
                    <p className="disc">{expert.description}</p>
                    <div className="author-area">
                      <Link
                        to={`/our-expert/expert-detail/${expert.id}`}
                        className="img"
                      >
                        <img
                          src={expert.image}
                          alt={expert.fullName}
                          style={{
                            borderRadius: "50%",
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                      <div className="info">
                        <h6 className="name">{expert.fullName}</h6>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
