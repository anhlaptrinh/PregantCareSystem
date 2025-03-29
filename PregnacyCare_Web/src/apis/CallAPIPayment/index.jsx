// File: CallAPIPayment/index.js
import APIClient from "../apiClient";

// API tạo thanh toán PayPal
export const useCreatePayment = (amount, currency) => {
  return APIClient.post({
    url: "/api/paypal/create",
    params: { amount, currency },
  });
};

// API thực hiện thanh toán (execute payment)
// Sau khi người dùng thanh toán thành công trên PayPal, sẽ cần gọi API này để hoàn tất giao dịch.
export const executePayment = (paymentId, payerId) => {
  return APIClient.post({
    url: `/api/paypal/execute`,
    data: { paymentId, payerId },
  });
};

export const useCreateUserPackage = (packageId) => {
  return APIClient.post({
    url: `/api/userpackage`,
    params: { packageId: packageId },
  });
};
