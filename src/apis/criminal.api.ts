import axios from "axios";

import type { Criminal, Info } from "../store/criminal/criminal.types";

const api = axios.create({
  baseURL: "https://randomuser.me/api/",
  headers: { "Content-Type": "application/json" },
});

type Response = {
  results: Criminal[];
  info: Info;
};

export const fetchCriminalList = async (number: number): Promise<Response> => {
  const response = await api.get<Response>(
    `?results=${number}&seed=a8de5274f6072052`
  );
  return response.data;
};
