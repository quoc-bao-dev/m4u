import axiosInstance from '@/core/http/axiosInstance'

const apiHome = {
  getHomePage() {
    return axiosInstance.get<any>(`/HomePage`)
  },
}

export default apiHome
