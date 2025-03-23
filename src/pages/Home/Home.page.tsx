import { useState } from "react";
import { useAppSelector } from "../../store/redux.hooks";

import CriminalInfo from "../../components/CriminalInfo/CriminalInfo.component";

import {
  selectAPICriminalList,
  selectAPICriminalByMale,
  selectAPICriminalByFemale,
} from "../../store/criminal/criminal.selector";

import type { ChangeEvent } from "react";

import "./home.style.scss";

type Gender = "all" | "male" | "female";

const filteredMap = {
  all: selectAPICriminalList,
  male: selectAPICriminalByMale,
  female: selectAPICriminalByFemale,
};

const Home = () => {
  const [filteredGender, setFilteredGender] = useState<Gender>("all");

  /**
   * @description 這邊就是 selector 的使用方式，非常簡單，把我們在 redux.hooks 定義的 useAppSelector 取出
   * @description 並傳入我們在 selector 裡面定義的 selector，就可以取得該 selector return 出來的資料
   * @description 這個過程叫做訂閱，如果之後有任何 Redux action 造成這個資料變更，那麼 Redux 在更新的時候
   * @description 會連帶 React 觸發 component re-render，非常方便。
   * @description 這邊看完的話可以到瀏覽器點擊 Wanted 頁面，然後到 components/CriminalInfo.component 中查看
   */
  const criminalsList = useAppSelector(filteredMap[filteredGender]);

  const onChangeToSelectGender = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilteredGender(value as Gender);
  };

  return (
    <div className="home">
      <div className="home__toolbar">
        <select name="gender" onChange={onChangeToSelectGender}>
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="home__content">
        {criminalsList.map((criminal, i) => (
          <CriminalInfo key={i} criminal={criminal} />
        ))}
      </div>
    </div>
  );
};

export default Home;
