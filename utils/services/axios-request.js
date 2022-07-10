import axios from "axios";
export const axiosRequest = async (
  method = "GET",
  url,
  data = null,
  headers = null
) => {
  return await axios({
    method: method,
    url: url,
    data: data,
    headers: headers,
  });
};
