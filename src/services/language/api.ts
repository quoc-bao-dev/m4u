import { envConfig } from "@/core/config";
import axiosInstance from "@/core/http/axiosInstance";

const apiLanguage = {
  getLanguageCurrent() {
    return axiosInstance.get<any>(`/getLanguageCurrent`, {
      baseURL: envConfig.adminUrl,
    });
  },
  
};

export default apiLanguage;