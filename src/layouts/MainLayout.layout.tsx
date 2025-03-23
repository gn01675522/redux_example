import { useEffect } from "react";
import { useAppDispatch } from "../store/redux.hooks";
import { Outlet } from "react-router-dom";

import NavBar from "./components/Navbar.component";

import { getCriminalListAsync } from "../store/criminal/criminal.asyncThunk";
import { setStateClear } from "../store/criminal/criminal.slice";

import type { FC } from "react";

const MainLayout: FC = () => {
  /**
   * @description 基本上當我們要做任何 redux 的 action 時，都需要定義這個 dispatch
   */
  const dispatch = useAppDispatch();

  /**
   * @description 我們只要透過 dispatch，再加入 asyncThunk callback 即可觸發 asyncThunk action
   * @description 底下的清除函式是用來清理狀態用的，只不過在這個專案內，MainLayout 是包裹全 App 的 component
   * @description 所以沒辦法觀測到其清除狀態的狀況，只不過是為了演示而做出來的
   *
   * @description 如果你在瀏覽器開啟 F12 開發者工具，你應該會看到 redux-logger 打印出來的資訊
   * @description 其會有三個資訊 prev state、action、next state
   * @description 沒意外的話，你會在 prev state 看見 criminal slice 定義的狀態內容，且裡面都是無資料的
   * @description 接著 action 則是會顯示我們目前觸發的是哪個 action，
   * @description 再來我們在 next state 會看見這個 action 所造成的結果，也就是在 apiCriminalList 那邊多出了很多資料
   * @description 在沒有清除或更新狀態的情況下，這個資料是可以持續存在，並可以在任何 component 當中取用
   * @description 這邊看完的話，可以移步至 pages/home/home.page 當中查看
   */
  useEffect(() => {
    dispatch(getCriminalListAsync());

    return () => {
      setStateClear();
    };
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
