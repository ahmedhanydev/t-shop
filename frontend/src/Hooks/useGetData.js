import baseURL from "../Api/BaseURL";

const useGetData = async (url, params) => {
  const res = await baseURL.get(url);
  return res;
};

const useGetDataWithToken = async (url) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const res = await baseURL.get(url, config);
  return res;
};
export { useGetData, useGetDataWithToken };
