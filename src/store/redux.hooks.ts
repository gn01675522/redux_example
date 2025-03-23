import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "./store";

/**
 * @description 這邊的 useDispatch、useSelector 都是我們要取用 state 或是要觸發 action 時必要的 method
 * @description 在使用 TypeScript 的情況下，一般的使用方式需要定義很多有的沒有的 type
 * @description 所以這邊先做預處理，透過 redux 提供的 withTypes method 來預先定義 type
 * @description 這樣我們只要在 component 當中調用這些 useAppDispatch、useAppSelector 就不用那麼麻煩填入 type 了
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
