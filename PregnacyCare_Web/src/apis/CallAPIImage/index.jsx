import { useEffect, useState, useCallback } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig";

const FIREBASE_IMAGES_KEY = "firebaseImagesByCategory";

export default function useFirebaseImagesByCategory(
  usersFolder = "pregnancyCareImages/users/",
  fetusFolder = "pregnancyCareImages/fetus/"
) {
  const [imagesByCategory, setImagesByCategory] = useState({
    users: [],
    fetus: [],
  });

  // Hàm lấy danh sách ảnh từ một folder
  const fetchImagesFromFolder = async (folderPath) => {
    const folderRef = ref(storage, folderPath);
    try {
      const result = await listAll(folderRef);
      const images = await Promise.all(
        result.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { id: item.name, url };
        })
      );
      return images;
    } catch (error) {
      console.error("Error fetching images from folder:", folderPath, error);
      return [];
    }
  };

  // Hàm tải toàn bộ ảnh từ cả 2 folder
  const fetchAllImages = useCallback(async () => {
    const usersImages = await fetchImagesFromFolder(usersFolder);
    const fetusImages = await fetchImagesFromFolder(fetusFolder);

    const images = {
      users: usersImages,
      fetus: fetusImages,
    };

    // Lưu vào localStorage
    localStorage.setItem(FIREBASE_IMAGES_KEY, JSON.stringify(images));
    setImagesByCategory(images);
  }, [usersFolder, fetusFolder]);

  useEffect(() => {
    // Kiểm tra localStorage
    const storedData = localStorage.getItem(FIREBASE_IMAGES_KEY);
    if (storedData) {
      setImagesByCategory(JSON.parse(storedData));
    } else {
      fetchAllImages();
    }
  }, [fetchAllImages]);

  // Thêm hàm refetch để cho phép gọi lại API nếu cần
  const refetchImages = async () => {
    await fetchAllImages();
  };

  return { imagesByCategory, refetchImages };
}
