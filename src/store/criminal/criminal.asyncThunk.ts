import { createAppAsyncThunk } from "../redux-utils";

import { fetchCriminalList } from "../../apis/criminal.api";

import type { AxiosRejectTypes } from "../redux-utils";
import type { Criminal, Info } from "./criminal.types";

/**
 * @description 在原始 redux 的用法當中，thunk 是個需要另外安裝的套件
 * @description 但是在 redux-toolkit 則是屬於 built-in 的 api
 * @description asyncThunk 專注於處理各種非同步的 api 副作用處理
 * @description 我們可以從結構裡面看到其使用方式跟我們一般使用 api 的方式一樣
 * @description 所以理解上應該並不會太困難。
 * @description 當然我們有使用 TypeScript 所以設定上較為複雜，所以需要傳入 type 定義，具體請看程式碼內註解
 * @description 除此之外，我們還需要定義其預設的 arg api，也就是被解構出 rejectWithValue 的那個 arg，
 * @description 其不只有 rejectWithValue，還有 dispatch 和其他 api 可以使用，可以去 Document 當中查看其他項目
 * @description 當然這些項目我們也需要給他們一個客製化的 types，具體可以去 redux-utils 那邊查看
 */
//* 取得所有 criminal 列表
export const getCriminalListAsync = createAppAsyncThunk<
  //* 這邊的兩個 arg，第一個為 return type，
  { results: Criminal[]; info: Info },
  //* 這邊的為傳入的 type
  void
  /**
   * @description 這邊的 criminal/getCriminalList 是 redux 的 action type。criminal 是告訴 redux 目前的 action 是屬於哪個 slice
   * @description 而 getCriminalList 則是告訴 redux 目前執行的 action 是哪一個，這個值是唯一的
   * @description 若有其他的 action type 與此相同則會相衝報錯
   */
>("criminal/getCriminalList", async (_, { rejectWithValue }) => {
  try {
    const res = await fetchCriminalList(25);

    const { results, info } = res;

    return { results, info };
  } catch (e) {
    const error = e as AxiosRejectTypes;

    //* 這邊是 asyncThunk 提供用來處理錯誤的 api，基本上不管是 try block 還是 catch block，return 出來的，在 slice 那邊都會是 paylod
    return rejectWithValue(error);
  }
});

//* 這邊看完可以去 selector 那邊查看
