import { combineReducers } from "@reduxjs/toolkit";

import criminalReducer from "./criminal/criminal.slice";

export const rootReducer = combineReducers({
  criminal: criminalReducer,
});
