import axiosInstance from "./axiosInstance";

export const getUserProblems = async () => {
  try {
    const response = await axiosInstance.get("/problems/my-problems");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Failed to fetch user's problems"
    );
  }
};
