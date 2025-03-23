### 🗂️ 索引
- [💡 前言](#-前言)
- [📦 專案結構](#-專案結構)
- [📖 使用套件](#-使用套件)
    - [主要使用套件](#主要使用套件)
- [✨ 建議步驟](#-建議步驟)
- [⭐️ Redux 整體概念](#️-redux-整體概念)
- [懶人包](#懶人包)

## 💡 前言

此為用來紀錄與分享 Redux-toolkit 用法，專案整體只有兩個頁面，一個是 Criminal，另一個是 Wanted；具體功能為：

1. 在 Criminal 當中顯示犯人資料
2. 點擊犯人資料使其變成 Wanted
3. 被標示成 Wanted 的罪犯會變成紅色的
4. 被標示成 Wanted 的罪犯會被呈現在 Wanted 頁面

功能很陽春，理論上這種小專案不該使用 Redux，因為根本沒辦法凸顯出優勢，但由於只是為了紀錄用法，
所以以方便演示期特性而主，因此請忽略某些不合理的或是較為隨便的部分，並在查看過程中去思考若是在更大 scale 的 web app 當中，
傳統 context 會有什麼問題，接著再回頭來思考 Redux 的用例，應該就能體會其好處。

對了，使用方式就是 npm i 裝完必要東西之後，直接 npm start 即可。

## 📦 專案結構

```
├── .github
├── config
├── public
└── src
    ├── apis    ✨api 放置處
    ├── components  ✨共用元件資料夾
    ├── layouts
    │   ├── components  ✨layouts 專屬元件資料夾
    │   ├── layout.layout.tsx
    │   └── layout.style.scss
    ├── pages
    │   └── page
    │       ├── page.page.tsx
    │       └── page.style.scss
    ├── store   ✨Redux-toolkit 狀態管理資料夾
    │   ├── category    ✨各式業務項目資料夾
    │   │   ├── category.asyncThunk.ts  ✨各式業務項目的 api action 互動檔案
    │   │   ├── category.selector.ts    ✨各式業務項目的選擇器檔案
    │   │   ├── category.slice.ts   ✨各式業務項目的 slice 檔案，你可以把它看作是每個業務項目的主控台
    │   │   └── category.types.ts   ✨各式業務項目的 types 檔案，主要用來放 api 的 return types
    │   ├── redux-utils.tsx ✨Redux-toolkit 的小工具放置處，或是預處理的事項；這邊主要是用來定義 asyncThunk 的預設 types
    │   ├── page.hooks.tsx  ✨Redux-toolkit 的 hooks，這邊主要是將某些常用的功能轉換成 typescript support
    │   ├── root-reducers.tsx   ✨Redux-toolkit 中用來存放所有業務類型的檔案，基本上會將上述 slice export 出來的東西放在裡面
    │   └── store.tsx   ✨Redux-toolkit 的基本設定
    ├── stylesheets
    └── App.tsx

```

## 📖 使用套件

#### 主要使用套件
- [React.js]
- [React-Router]
- [Redux-toolkit]
- [axios]
- [redux-logger](Optional but Recommend)
- [SCSS](Optional --dev)
- [Webpack](Optional --dev)
- [TypeScript](Optional --dev)
- [@types/react](TypeScript only --dev)
- [types/react-dom](TypeScript only --dev)
- [@types/redux-logger](TypeScript && Redux-logger only --dev)
- [API](https://randomuser.me/)

其餘的都是 webpack 在用的東西，完全不重要。


## ✨ 建議步驟

1. 先稍微看一下底下的大概念，大概看一下就好
2. 再來去 store/store.ts 查看，該處會有註解引導你至其他 Redux 相關檔案查看，這邊的內容也大概看一下有印象就好
3. 承上，Redux 相關檔案看完之後會引導至實際頁面查看，建議是從 layouts/MainLayout -> pages/Home -> pages/Wanted 的這個順序
4. 看完之後再回來看下面的懶人包
5. 可以的話自己開個專案，並搭配懶人包來玩玩

## ⭐️ Redux 整體概念

- 與 React 概念高度吻合，單向資料流、且狀態改變的方式為預約狀態
- 承上，因此所有 Redux 裡面的 state 在概念上都是 immutable，不可變的
- 如同上述，變化需要預約，所有的動作 (action) 都是在執行預約的動作
- 當你觸發任何 action 時，Redux 會接收到你的指令，接著會如同 React 一樣，會觸發 slice 裡面的 state 更新
- 承上，其更新是屬於淺比較，且更準確來說不是更新原先資訊，而是整個 return 一個新的資料
- Redux 的 state 更新也會觸發 React 更新，前提是你需要在 component 中訂閱被改變的那個狀態
- 乘上，這邊的更新不會像是 context 一樣會使整個 App 更新，而是精確的只更新訂閱該狀態的 components
- 總結來說：執行 actions -> 觸發 state 更動 -> 觸發 view 變動

## 懶人包
1. 建立或是複製這邊的 store 與 rootReducer、redux-utils、redux.hooks
2. 至 root/index.tsx 中設立 Provider
3. 根據需要建立業務類別資料夾，並建立底下的檔案，或是直接從這邊複製也可以
4. 修改業務類別資料夾裡面子檔案的名稱
5. 修改 slice 裡面的名稱以及 initialState
6. 至 rootReducer 中新增剛剛建立的 slice (或稱 reducer)
7. 修改其他檔案名稱與內容 (e.g asyncThunk、selector)
8. 直接在 component 或是頁面中使用，中間有不清楚的話在根據相對應檔案看裡面說明
9. 上述建置完畢後，之後要新增業務類別只要重複 3 ~ 6 步驟即可