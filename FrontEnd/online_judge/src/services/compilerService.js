import axios from "axios";

const API_URL = "http://localhost:5000";

export const runCode = async (language, code, input) => {
  try {
    const response = await axios.post(`${API_URL}/run`, {
      language,
      code,
      input,
    });
    return response.data;
  } catch (error) {
    console.error("Error executing code:", error);
    throw error;
  }
};
