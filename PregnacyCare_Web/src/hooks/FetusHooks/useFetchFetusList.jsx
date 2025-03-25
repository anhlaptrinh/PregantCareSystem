// useFetusList.js
import { useQuery } from "@tanstack/react-query";
import { ref, getDownloadURL } from "firebase/storage";
import PregnantAvatar from "../../assets/PregnantAvatar.jpg";
import { storage } from "../../firebase/firebaseConfig";
import { useGetMyFetusList } from "../../apis/CallAPIFetus";

export const useFetchFetusList = () => {
  return useQuery({
    queryKey: ["fetusList"],
    queryFn: async () => {
      const res = await useGetMyFetusList();
      if (res.code === 200 && res.data) {
        const fetusWithImages = await Promise.all(
          res.data.map(async (fetus) => {
            try {
              const imageRef = ref(
                storage,
                `pregnancyCareImages/fetus/${fetus.idFetus}`
              );
              const url = await getDownloadURL(imageRef);
              return { ...fetus, imageUrl: url };
            } catch (error) {
              console.error(
                "Error retrieving image for fetus id",
                fetus.idFetus,
                error
              );
              // Nếu không lấy được ảnh, trả về ảnh mặc định
              return { ...fetus, imageUrl: PregnantAvatar };
            }
          })
        );
        return fetusWithImages;
      }
      return [];
    },
  });
};
