import axios from "axios";

const api = axios.create({
  baseURL: "https://kindle-review-analyzer.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadCSV = async (file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        onProgress(percentCompleted);
      }
    },
  });
  return response.data;
};

export const fetchReports = async () => {
  const response = await api.get("/report");
  return response.data;
};

export const fetchReportDetail = async (id) => {
  const response = await api.get(`/report/${id}`);
  return response.data;
};

export const deleteReport = async (id) => {
  const response = await api.delete(`/report/${id}`);
  return response.data;
};

export const fetchStats = async () => {
  const response = await api.get("/report/stats");
  return response.data;
};

export default api;
