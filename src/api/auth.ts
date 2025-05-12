import makeApiRequest from "@/lib/call-api";

export const authAPI = {
  register: (name: string, email: string, password: string, captchaToken: string) =>
    makeApiRequest("post", "/auth/register", { name, email, password, captchaToken }),

  login: (email: string, password: string) =>
    makeApiRequest("post", "/auth/login", { email, password }),

  verifyOTP: (userId: string, otp: string) =>
    makeApiRequest("post", "/auth/verify-otp", { userId, otp }),

  logout: () => makeApiRequest("post", "/auth/logout"),
};
