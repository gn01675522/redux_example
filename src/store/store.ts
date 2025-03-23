import { configureStore, Middleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { rootReducer } from "./root-reducers";

/**
 * @description 這邊的檔案是整個 Redux 的基礎設置
 * @description 在大部分時候直接複製這邊的 code 並貼上即可
 * @description 如果有任何需要的 middleware 可以直接放入下方 middlewares 的陣列中
 * @description 就像下方的 redux-logger 一樣
 * @description 當然還有其他進階的用法，可以去 Redux 官網查看
 */
const middlewares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
) as Middleware[];

/**
 * @description 我們需要使用 configureStore 建立一個 store，這是官方規定用法
 * @description 裡面接受傳入 reducer、middleware、devTools、preloadedState、enhancers
 * @description reducer 是最重要的，用來組合我們在每個業務類別所設定的主控台
 * @description 承上，補充一下，雖然官方沒有定義要怎麼分類檔案及資料夾，但是我這邊會使用業務類別來做區分，
 * @description 承上，像是要做個電商網站，可能會有員工、產品、訂單等等各種不同部分，我會依此來做資料夾區分
 * @description middleware 就是中間件，除了這邊有裝的 logger，以及 toolkit 自帶的 thunk api 之外，
 * @description 我們還可以做出自訂的 middleware，讓他可以每次請求都帶 JWT token 等等的功能
 * @description devTools 是可以讓你透過瀏覽器來查看狀態改變資料，其預設我記得 procces.env.NODE_ENV !== 'production' 會啟用
 * @description preloadedState 則是預設傳入的狀態，這個我不常用，但大致上他的優先權會大過各個業務類別的 initialState，
 * @description 承上，其方式會在整個 store 初始化時，將我們設定的 preloadedState 拿來取代 initialState，但這功能似乎在 SSR 上使用較多
 * @description enhancers 可以強化整個 store 的使用方式，具體可以做到很多事情，像是紀錄 dispatch 觸發次數，又或是紀錄 dispatch 歷史
 * @description 又或是可以回復之前的歷史等等...但也不常用
 * @description 基本上只要傳入 reducer 和 middleware 即可，這應該可以處理 95% 以上的需求，其他的有需要再使用
 * @description 順帶一提，在官網中的案例中，這邊的 reducer 會直接接受各個業務類別定義的 reducer
 * @description 而我則是將其分開，原因是若業務類別很多，則會變得很雜亂，因此獨立做成一個 root-reducers 來放置會比較好
 * @description 簡單來說，如果沒有其他特殊需求，就直接複製整份即可。
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      /**
       * @mention 這邊的 serializableCheck 請將其設置為 false
       * @mention 若沒有設置為 false，有很多情況下會報錯
       * @mention 簡單來說 redux 在 dispatch 時會只接受可被序列化的資料
       * @mention 所以有時候我們會傳入什麼 Date 還是 function 之類格式的資料，就會不符合規範
       * @mention 實際上傳入這些值，只要是我們預期的，理論上都是在可以控制的範圍
       * @mention 所以就讓他變成 false 較為方便
       */
      serializableCheck: false,
    }).concat(middlewares),
});

/**
 * @description 這邊是為了 TypeScript 使用的官方做法，Document 上有寫，
 * @description 具體請看 redux.hooks.ts 這支檔案
 * @description 理論上應該要放到 redux-utils 裡面，但我認為寫在這邊會比較合邏輯，這部分自行決定
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//* 由於 redux 跟 context 一樣，需要提供 Provider，所以請先去 root/index.tsx 當中查看，看完後請去 root-reducers.ts
