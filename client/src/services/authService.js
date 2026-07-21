import api from "./api";



const authService = {
  login: async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  register: async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  verifyOtp: async (data) => {
    const response = await api.post("/auth/verify-otp", data);
    return response.data;
  },

  resendOtp: async (email) => {
    const response = await api.post("/auth/resend-otp", { email });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

export default authService;