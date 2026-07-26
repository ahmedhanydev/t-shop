import baseURL from "../Api/BaseURL";

const useDeleteData = async (url, params) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const res = await baseURL.delete(url, config);
  return res;
};

export default useDeleteData;
