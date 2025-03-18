import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase/firebaseConfig"; // Điều chỉnh đường dẫn cho phù hợp

/**
 * Upload một file ảnh lên Firebase Storage.
 * @param {string} folderPath - Đường dẫn folder (ví dụ: "pregnancyCareImages/users")
 * @param {File} file - File ảnh cần upload.
 * @param {int} id - Lưu với tên image là id.
 * @returns {Promise<Object>} - Promise trả về object { id, url } nếu upload thành công.
 */
export const useUploadImage = async (folderPath, file, id) => {
  try {
    // Tạo reference với tên id để lưu
    const storageRef = ref(storage, `${folderPath}/${id}`);
    // Upload file vào Firebase
    await uploadBytes(storageRef, file);
  } catch (error) {
    throw new Error("Error uploading image: " + error.message);
  }
};

/**
 * Cập nhật ảnh trên Firebase Storage.
 * Với Firebase, nếu upload một file mới lên cùng một reference thì file cũ sẽ bị ghi đè.
 * Do đó hàm updateImage cũng hoạt động tương tự như uploadImage.
 * @param {string} folderPath - Đường dẫn folder.
 * @param {File} file - File ảnh mới.
 * @returns {Promise<Object>} - Promise trả về object { id, url } của ảnh đã cập nhật.
 */
export const useUpdateImage = async (folderPath, file) => {
  // Upload lại file, ghi đè file cũ nếu cùng tên
  return useUploadImage(folderPath, file);
};

/**
 * Xóa ảnh khỏi Firebase Storage.
 * @param {string} folderPath - Đường dẫn folder.
 * @param {string} fileName - Tên file (định danh) của ảnh cần xóa.
 * @returns {Promise<boolean>} - Promise trả về true nếu xóa thành công.
 */
export const useDeleteImage = async (folderPath, fileName) => {
  try {
    const storageRef = ref(storage, `${folderPath}/${fileName}`);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    throw new Error("Error deleting image: " + error.message);
  }
};

export const useGetImageUrl = async (folderPath, id) => {
  try {
    const storageRef = ref(storage, `${folderPath}/${id}`);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.log("Error getting image URL: " + error.message);
  }
};
