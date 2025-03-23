import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getCriminalListAsync } from "./criminal.asyncThunk";

import type { AxiosRejectTypes } from "../redux-utils";
import type { Criminal } from "./criminal.types";

interface CriminalState {
  readonly apiCriminalsList: Criminal[];
  readonly wantedList: Criminal[];
  readonly isLoading: boolean;
  readonly info: {};
  readonly error: AxiosRejectTypes | null;
}

const INITIAL_STATE: CriminalState = {
  apiCriminalsList: [],
  wantedList: [],
  isLoading: false,
  info: {},
  error: null,
};

const criminalSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCriminalToBeWanted(state, action: PayloadAction<Criminal>) {
      const criminalIdentify = action.payload.login.uuid;
      const isExist = state.wantedList.some(
        (criminal) => criminal.login.uuid === criminalIdentify
      );

      if (isExist) {
        state.wantedList = state.wantedList.filter(
          (criminal) => criminal.login.uuid !== criminalIdentify
        );
      } else {
        state.wantedList.push(action.payload);
      }
    },
    setStateClear: () => INITIAL_STATE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCriminalListAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCriminalListAsync.fulfilled, (state, { payload }) => {
        state.apiCriminalsList = payload.results;
        state.info = payload.info;
        state.isLoading = false;
      })
      .addCase(getCriminalListAsync.rejected, (state, { payload }) => {
        if (payload) state.error = payload;
        state.isLoading = false;
      });
  },
});

export const { setCriminalToBeWanted, setStateClear } = criminalSlice.actions;
export const criminalReducer = criminalSlice.reducer;

export default criminalReducer;
