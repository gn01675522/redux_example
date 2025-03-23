import { createAppAsyncThunk } from "../redux-utils";

import { fetchCriminalList } from "../../apis/criminal.api";

import type { AxiosRejectTypes } from "../redux-utils";
import type { Criminal, Info } from "./criminal.types";

//* 取得所有 criminal 列表
export const getCriminalListAsync = createAppAsyncThunk<
  { results: Criminal[]; info: Info },
  void
>("criminal/getCriminalList", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchCriminalList(25);

    const { results, info } = res;

    return { results, info };
  } catch (e) {
    const error = e as AxiosRejectTypes;

    return rejectWithValue(error);
  }
});
