import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectCriminalReducer = (state: RootState) => state.criminal;

//* 取出 apiCriminalsList
export const selectAPICriminalList = createSelector(
  [selectCriminalReducer],
  (criminal) => criminal.apiCriminalsList
);

//* 根據取出的 apiCriminalsList 來過濾出男性
export const selectAPICriminalByMale = createSelector(
  [selectAPICriminalList],
  (apiCriminalsList) =>
    apiCriminalsList.filter((criminal) => criminal.gender === "male")
);

//* 根據取出的 apiCriminalsList 來過濾出女性
export const selectAPICriminalByFemale = createSelector(
  [selectAPICriminalList],
  (apiCriminalsList) =>
    apiCriminalsList.filter((criminal) => criminal.gender === "female")
);

//* 取出 wantedList
export const selectWantedList = createSelector(
  [selectCriminalReducer],
  (criminal) => criminal.wantedList
);

//* 根據取出的 wantedList 來過濾出男性
export const selectWantedCriminalByMale = createSelector(
  [selectWantedList],
  (wantedList) => wantedList.filter((criminal) => criminal.gender === "male")
);

//* 根據取出的 wantedList 來過濾出女性
export const selectWantedCriminalByFemale = createSelector(
  [selectWantedList],
  (wantedList) => wantedList.filter((criminal) => criminal.gender === "female")
);
