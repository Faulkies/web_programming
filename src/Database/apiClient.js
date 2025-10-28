import axios from "axios";

export const api = axios.create({
  baseURL: "/api/inft3050",
  headers: {
    'Accept': 'application/json',
    'xc-auth': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ',
  },
  withCredentials: true,
});

export const authApi = axios.create({
  baseURL: "/",
  headers: {
    'Accept': 'application/json',
    'xc-auth': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ',
  },
  withCredentials: true,
});

export async function adminLogin() {
  const response = await authApi.post("/login", {
    username: "adminAccount",
    password: "adminPW"
  });
  console.log("Admin login response:", response.data);
  return response.data;
}