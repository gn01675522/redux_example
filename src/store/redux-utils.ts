import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "./store";

import type { AxiosError } from "axios";

type RejectTypes = {
  error: string;
};

export type AxiosRejectTypes = AxiosError<RejectTypes>;

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

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkAPIConfig>();
