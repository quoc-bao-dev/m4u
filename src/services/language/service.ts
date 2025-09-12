import axiosInstance from "@/core/http/axiosInstance";

const apiLanguage = {
  getLanguageCurrent() {
    return axiosInstance.get<any>(`https://m4u-admin.fmrp.vn/api/getLanguageCurrent`);
  },
  
};

export default apiLanguage;