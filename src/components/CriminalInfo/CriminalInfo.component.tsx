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
