import { useEffect } from "react";
import { useAppDispatch } from "../store/redux.hooks";
import { Outlet } from "react-router-dom";

import NavBar from "./components/Navbar.component";

import { getCriminalListAsync } from "../store/criminal/criminal.asyncThunk";
import { setStateClear } from "../store/criminal/criminal.slice";

import type { FC } from "react";

const MainLayout: FC = () => {
  const dispatch = useAppDispatch();

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
