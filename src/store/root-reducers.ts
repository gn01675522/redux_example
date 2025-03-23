import { combineReducers } from "@reduxjs/toolkit";

import criminalReducer from "./criminal/criminal.slice";

/**
 * @description 這邊其實沒什麼好講的，就使用 combineReducers 來組合各個 reducer
 * @description 這邊的 xxxReducer 會從各個 slice 當中傳出，等看到 slice 那邊時就會知道了
 * @description 接下來請至 store/criminal/criminal.slice.ts 查看
 */
export const rootReducer = combineReducers({
  criminal: criminalReducer,
});
