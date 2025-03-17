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
 * @returns {Promise<Object>} - Promise trả về object { id, url } nếu upload thành công.
 */
export const useUploadImage = async (folderPath, file) => {
  try {
    // Tạo reference với tên file để lưu, có thể sử dụng file.name hoặc định danh riêng nếu cần
    const storageRef = ref(storage, `${folderPath}/${file.name}`);
    // Upload file vào Firebase
    await uploadBytes(storageRef, file);
    // Lấy URL tải về của file vừa upload
    const url = await getDownloadURL(storageRef);
    return { id: file.name, url };
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

/**
 * Lấy URL của ảnh từ Firebase Storage.
 * @param {string} folderPath - Đường dẫn folder.
 * @param {string} fileName - Tên file của ảnh.
 * @returns {Promise<string>} - Promise trả về URL của ảnh.
 */
export const useGetImageUrl = async (folderPath, fileName) => {
  try {
    const storageRef = ref(storage, `${folderPath}/${fileName}`);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    throw new Error("Error getting image URL: " + error.message);
  }
};

// // Xuất ra một object chứa các hàm đã định nghĩa
// const CallAPIFirebase = {
//   uploadImage,
//   updateImage,
//   deleteImage,
//   getImageUrl,
// };

// export default CallAPIFirebase;
