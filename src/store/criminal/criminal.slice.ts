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

/**
 * @description 基本上每個 slice 都要設置 INITIAL_STATE
 * @description 這邊就是在定義你想要讓哪些資料存在於全域狀態中
 * @description 而這邊的狀態會透過底下的 actions，也就是 reducer 以及 extraReducers 來去觸發更新
 * @description 我們可以看見上面的 interface 每個都有設定 readonly，事實上不設定也沒關係
 * @description 這是以前使用 Redux 的習慣，用意是告訴開發者，這邊的 state 是不可變的
 */
const INITIAL_STATE: CriminalState = {
  apiCriminalsList: [],
  wantedList: [],
  isLoading: false,
  info: {},
  error: null,
};

/**
 * @description 基本上每個 slice 都需要有個 name，這個 name 是 redux 用來區分目前觸發的動作到底是屬於哪個 slice 的 key，如果有重複的會相衝
 * @description 底下的 reducers 以及 extraReducers 都是 slice 的 action，兩者差別在於
 *
 * @reducers reducers 是這個 slice 本身自定義的邏輯，只能放置自定義的 action
 * @reducers 且我們可以透過 export 的方式來將定義好的方法 export 出去給其他地方使用
 *
 * @extraReducers extraReducers 主要是外部定義的邏輯，更精確來說，這邊是設定如果有某個外部 actions 動作時，我們希望這個 slice 的狀態該如何改變
 * @extraReducers 這邊最常放的是 asyncThunk (Redux-toolkit 預設用來處理非同步的方法)
 *
 * @description 總結來說，reducers 是這個 slice 本身的專屬方法，我們可以透過撰寫函式的方式來做相對應的邏輯處理，並 export 出去別的地方使用
 * @description 而 extraReducer 則是我們希望某個外部 action 被觸發時，這個 slice 的 state 該如何動作
 *
 * @mention reducers 及 extraReducers 兩者本身皆只能使用純函式，且不能有副作用
 *
 * @mention 雖然 Redux 官網好像沒有說，也沒有明定 state 該怎麼規劃
 * @mention 但根據我學到的，以及我經驗到的，大多數與業務邏輯相關的東西請警慎小心
 * @mention 由於是全域狀態，所以單一狀態會被多個 component 使用，
 * @mention 所以我們不應該在使用之前就預先做業務邏輯處理 (e.g. 預先分類，如同底下 extraReducer 被註解起來的部分)
 * @mention 又或者是使用 action 來觸發上述的業務邏輯處理 (e.g. 透過 reducers 裡的 action 來做分類)
 * @mention 尤其是跟 api 有關的資料，因為我們會希望我們接收到的狀態與資料庫的狀態一致
 * @mention 這邊可能會想問，那既然如此，不就連原先的 state 都不能修改了？
 * @mention 倒不是這樣說，因為當我們修改某個狀態的時候，心裡會預期該狀態就是 "必須" 改變
 * @mention 因此在這種情況下，我們也會預期所有訂閱該 state 的 component 會接收到同樣的改變
 * @mention 所以我們還是可以去修改它，而類似預先分類這種方式會導致後續使用的時候，我們取得的會是分類後的資料
 * @mention 如果臨時有變，我們需要另外一種資料的過濾方式，就必須再執行一次 action，或是再定義一個 state 來去做另外一種業務邏輯
 * @mention 不但費時費力，當程式碼量一大又會很難維護，因為 state 一定會很多，actions 一定會很雜
 * @mention 所以這邊要注意的是，盡量不要預先做業務邏輯，比如資料分類、資料拆分等
 * @mention 而是盡量讓資料的變動符合我們的預期，也就是必要動的時候再動
 * @mention 這部分有點 tricky，希望我能說明清楚，下面有幾個案例希望可以幫助思考
 *
 * @example1 如果有個跨頁面的 modal，我們不希望使用 context，因為使用 context 可能會造成 props drilling，
 * @example1 以及我們不想因為 context 變動，而無差別連帶觸發底下 components re-render，此時可以使用 Redux 來控制，
 * @example1 那麼就可以在 INITIAL_STATE 加入一個 isModalOpen 的 state，並定義一個 action 來觸發其 boolean 轉換
 * @example1 這個案例是正確，且符合邏輯的，因為在執行一個 action，也就是觸發 modal 開與關的時候，
 * @example1 我們心裡會預期所有與這個 modal 有關的 component 都享有共同的狀態，我們不會預期說，我們在 A 頁面關閉 modal
 * @example1 但是在 B 頁面 modal 卻是開啟的，所以這個 case 的使用方式是正確的。
 *
 * @example2 如果今天我們有個表格，裡面有非常多的 select 欄位，目的是用來選擇每項工作負責的員工，而在大多數的案例裡面，
 * @example2 選擇 select 觸發之後會使用類似迴圈方式來選擇相對應的項目，但這樣的時間複雜度是 O(n)，這種操作一多，很容易有效能瓶頸
 * @example2 我們希望可以提升效能，所以我們在 state 裡面多加上個 employeeMap，希望讓 employeeList 從原本陣列的資料型態，
 * @example2 變成 Object 或是 Map，來讓每次操作變成 O(1)，藉此來提升效能
 * @example2 這種方式是 OK 的，原因是因為原本的 employeeList 與 employeeMap 是屬於兩種完全不同的使用情境
 * @example2 所以不會有邏輯冗餘的問題，也不會有相衝突的情形
 *
 * @anti_pattern 由於某個資料，我們假設為衣服好了，其數量頂多幾百筆，後端覺得麻煩不想幫我們做分類，所以丟給我們自行來做分類，
 * @anti_pattern 而分類總共有男裝、女裝、鞋子等等，於是我們在 state 當中加入男裝、女裝等 state，
 * @anti_pattern 接著在 actions 處就預先將東西分類好；這種用例是不行的。
 * @anti_pattern 原因是因為就邏輯來說，原始未分類資料、男裝、女裝、鞋子等，基本上都是屬於同個應用情境，都是屬於將資料以某種方式呈現的邏輯，
 * @anti_pattern 就只不過是資料的呈現方式不同而已。且順著這個思路我們可以得知，如果往後有更多分類，我們就必須使用更多 state
 * @anti_pattern actions 的量也會跟著變多，在某些情況下，甚至會造成 fetch 資料的次數變高，所以這不是個很聰明的辦法，因此是屬於 anti-pattern 的範疇。
 */
const criminalSlice = createSlice({
  name: "criminal",
  initialState: INITIAL_STATE,
  reducers: {
    /**
     * 當 user 點擊某個 criminal 時，將該 criminal 加入 wantedList 裝中
     * @param state
     * @param action 這邊的 action 基本上解構後會是 {payload, type}，如果使用純 redux 的話 type 會是用來區分目前是執行哪種動作的 key
     * 但是現在是使用 redux-toolkit 所以大部分情況下都不需要管 type 是什麼。而 payload 的部分則是我們在 component 當中傳入的值
     * 底下的 extraReducer 基本上也會是同個 arg 結構
     */
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
    /**
     * @description 這邊會導致所有存取到 apiCriminalsList 的地方都是分類後的資料，
     * @description 這邊可能會想說，那麼我新增一個 maleList 的話不就可以解決這個問題？
     * @description 實際上這是個邏輯冗余的做法，因為 Redux 有提供 selector 這個功能，讓我們可以使用 state 的副本來去做各式的業務邏輯
     */
    // setFilteredMaleCriminal(state) {
    //   state.apiCriminalsList.filter((criminal) => criminal.gender === "male");
    // },
    /**
     * @description 這邊是清除函式，由於 redux 不會主動清除，所以我們會需要在特定 component 當中使用清除函式來將狀態變為預設值
     * @returns {void}
     */
    setStateClear: () => INITIAL_STATE,
  },
  /**
   * @description 這邊就是當外部 action 被觸發時，我們要怎麼變更狀態的地方
   * @description 這裡大多數都會放置 asyncThunk 相關的 action，用來處理 api 互動時的每個階段我們要做什麼事情
   * @description 事實上不需要三個階段都定義，如果沒有 isLoading 需求或是 error 顯示的話，只要針對 fullfill 即可
   * @param builder
   */
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

/**
 * @description 這邊是將 reducers 那邊定義的 action export 出去的地方
 * @description 至於底下的 criminalReducer 則是 export 出去給 root-reducer 使用
 */
export const { setCriminalToBeWanted, setStateClear } = criminalSlice.actions;
export const criminalReducer = criminalSlice.reducer;

export default criminalReducer;

//* 這邊看完的話可以去 asyncThunk 那邊查看
