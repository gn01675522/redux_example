import { useAppDispatch, useAppSelector } from "../../store/redux.hooks";

import { setCriminalToBeWanted } from "../../store/criminal/criminal.slice";

import { selectWantedList } from "../../store/criminal/criminal.selector";

import type { FC } from "react";
import type { Criminal } from "../../store/criminal/criminal.types";

import "./CriminalInfo.style.scss";

interface CriminalInfoProps {
  criminal: Criminal;
}

const CriminalInfo: FC<CriminalInfoProps> = ({ criminal }) => {
  const { picture, name, gender, location } = criminal;

  const dispatch = useAppDispatch();

  const isItWanted = useAppSelector(selectWantedList)?.some(
    (item) => item.login.uuid === criminal.login.uuid
  );

  /**
   * @description 其實到了這邊大多數的特性都演示完畢了
   * @description 主要可以透過 F12 看看，我們在 MainLayout 所執行的 api fetch 資料是否都會持續存在
   * @description 如果你中間有點擊其中幾個人的卡片的話，我們可以看見，在 Wanted 頁面會將 wantedList 中的人物 render 出來
   * @description 而其具體功能 action 就是以下函式達成，這邊很簡單，應該不需要多贅述
   * @description 接下來有空的話就自己開個專案來試試看吧！
   */
  const onClickToSetCriminalWantedState = () => {
    dispatch(setCriminalToBeWanted(criminal));
  };

  return (
    <div
      className={`criminal-info ${isItWanted ? "criminal-info--wanted" : ""}`}
      onClick={onClickToSetCriminalWantedState}
    >
      <div className="criminal-info__avatar">
        <img src={picture.medium} className="criminal-info__avatar-img" />
      </div>
      <div className="criminal-info__content">
        <div className="criminal-info__content-item">
          <div className="criminal-info__content-item-column">Name：</div>
          <span>{`${name.first || ""} ${name.last || ""}`}</span>
        </div>
        <div className="criminal-info__content-item">
          <div className="criminal-info__content-item-column">Gender：</div>
          <span>{gender || ""}</span>
        </div>
        <div className="criminal-info__content-item">
          <div className="criminal-info__content-item-column">
            Location (city)：
          </div>
          <span>{location.city || ""}</span>
        </div>
      </div>
    </div>
  );
};

export default CriminalInfo;
