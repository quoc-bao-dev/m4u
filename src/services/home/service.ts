import axiosInstance from '@/core/http/axiosInstance'

const apiHome = {
  getHomePage() {
    return axiosInstance.get<any>(`https://m4u-admin.fmrp.vn/api/HomePage`)
  },
}

export default apiHome
