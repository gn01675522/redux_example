import { useAppSelector } from "../../store/redux.hooks";

import CriminalInfo from "../../components/CriminalInfo/CriminalInfo.component";

import { selectWantedList } from "../../store/criminal/criminal.selector";

import "./Wanted.style.scss";

const Wanted = () => {
  const wantedList = useAppSelector(selectWantedList);
  return (
    <div className="wanted">
      <div className="wanted__content">
        {wantedList.map((criminal, i) => (
          <CriminalInfo key={i} criminal={criminal} />
        ))}
      </div>
    </div>
  );
};

export default Wanted;
