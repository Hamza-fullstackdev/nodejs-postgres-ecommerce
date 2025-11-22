import axios from "axios";

export const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url, { withCredentials: true });
    return res.data;
  } catch (err: any) {
    throw err.response?.data || { message: "Network error" };
  }
};

export const swrOptions = {
  revalidateOnFocus: false,
  dedupingInterval: 600000,
};
