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
