import requestAPI from "@/lib/requestAPI";

export const authAPI = {
  register: (name: string, email: string, password: string, captchaToken: string) =>
    requestAPI("post", "/auth/register", { name, email, password, captchaToken }),

  login: (email: string, password: string) =>
    requestAPI("post", "/auth/login", { email, password }),

  verifyOTP: (userId: string, otp: string) =>
    requestAPI("post", "/auth/verify-otp", { userId, otp }),

  logout: () => requestAPI("post", "/auth/logout"),
};
