import baseURL from "../Api/BaseURL";

const useUpdateData = async (url, params) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const res = await baseURL.put(url, params, config);

  return res;
};
const useUpdateDataWithImage = async (url, params) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGExOGRlNmVlYzNhYzNhZmNmNTkwZjAiLCJpYXQiOjE2OTAyMDU5NTgsImV4cCI6MTY5Nzk4MTk1OH0.ogjIpOpjrYELxhpobMUj-mmy3orCzQLFLTiQezFqiZM";
  //   const headersContainaer = { Authorization: `Bearer ${token}` };
  //   console.log(headersContainaer);
  const res = await baseURL.put(url, params, config);
  console.log(res);
  return res;
};

export { useUpdateData, useUpdateDataWithImage };
