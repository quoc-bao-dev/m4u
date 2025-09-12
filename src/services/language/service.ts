import axiosInstance from "@/core/http/axiosInstance";

const apiLanguage = {
  getLanguageCurrent() {
    return axiosInstance.get<any>(`getLanguageCurrent`);
  },
  
};

export default apiLanguage;