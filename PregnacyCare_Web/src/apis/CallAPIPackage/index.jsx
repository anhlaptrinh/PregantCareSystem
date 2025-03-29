import APIClient from "../apiClient";

export const useGetAllPackages = () => {
  return APIClient.get({
    url: "/api/packages",
  });
};

export const useCreatePackage = (newPackage) => {
  return APIClient.post({
    url: "/api/packages",
    data: {
      id: 0,
      name: newPackage.name,
      price: newPackage.price,
      description: newPackage.description,
    },
  });
};

export const useGetPackage = (id) => {
  return APIClient.get({
    url: `/api/packages/${id}`,
  });
};

export const useDeletePackage = (id) => {
  return APIClient.delete({
    url: `/api/packages/${id}`,
  });
};

export const useUpdatePackage = (id, values) => {
  return APIClient.put({
    url: `/api/packages`,
    data: {
      id: id,
      name: values.name,
      price: values.price,
      description: values.description,
    },
  });
};
