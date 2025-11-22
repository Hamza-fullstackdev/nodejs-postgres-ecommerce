import axios from "axios";

export const fetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data);

export const swrOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateIfStale: false,
  dedupingInterval: 600000,
};
