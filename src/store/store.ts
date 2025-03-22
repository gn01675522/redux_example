import { configureStore, Middleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { rootReducer } from "./root-reducers";

export type RootState = ReturnType<typeof rootReducer>;

const middlewares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
) as Middleware[];

export const store = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(middlewares),
    preloadedState,
  });

export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
