import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "./store";

import type { AxiosError } from "axios";

type RejectTypes = {
  error: string;
};

export type AxiosRejectTypes = AxiosError<RejectTypes>;

/**
 * @description 這就是 ThunkAPI 的 type 預處理，基本上可以直接從官網 Document 當中複製下來
 * @description 然後依據需求來設定他的 types
 */
export type ThunkAPIConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: AxiosRejectTypes;
  extra?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

/**
 * @description 由於使用的是 TypeScript，我們可以使用 redux 提供的 withTypes 來傳入上述我們定義的預處理
 * @description 這樣就不用那麼麻煩的在 asyncThunk 那邊設定那麼多東西
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkAPIConfig>();
