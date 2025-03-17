import APIClient from "../apiClient";

export const useGetMyComments = () => {
  return APIClient.get({
    url: "/api/blog-comments/my-comments",
  });
};

export const useGetAllComments = (blogId) => {
  return APIClient.get({
    url: `/api/blog-comments/${blogId}`,
  });
};

export const useCreateComment = (blogId, description) => {
  return APIClient.post({
    url: `/api/blog-comments`,
    params: { blogId, description },
  });
};

export const useDeleteComment = (commentId) => {
  return APIClient.delete({
    url: `/api/blog-comments/${commentId}`,
  });
};
