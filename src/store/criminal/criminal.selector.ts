import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

/**
 * @description 這個函式他具體來說是個 helper，用來選擇在 store 裡面的特定 reducer
 * @description 簡單來說就是告訴使用此 helper 的 selector，我們要取得哪種業務類型的 state
 * @param state
 * @returns {Partial<RootState>}
 */
const selectCriminalReducer = (state: RootState) => state.criminal;

/**
 * @description 使用方式很簡單，createSelector 接收兩個 arg
 * @param array 用來定義這個 selector 要使用哪些 state，可以傳入多組，如果有必要的話，
 * @param callback 而這個 callback 會根據前個 arg 裡面的 helper 所定義的特定業務類別，來 return 其業務類別的 state
 */
//* 取出 apiCriminalsList
export const selectAPICriminalList = createSelector(
  [selectCriminalReducer],
  (criminal) => criminal.apiCriminalsList
);

/**
 * @description 基本上除了使用 helper 之外，我們還可以使用其他 selector 來當作第一個 arg，
 * @description 其實使用 helper 還是其他 selector 哪個都沒差，只是我們可以更直觀的知道，其資料依據為何
 * @description 順帶一提，這邊的 callback 不能直接改動原始資料，必須要使用可以 return 新資料的方式才行
 */
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

//* 看完就可以去 layout、pages 那邊查看了
