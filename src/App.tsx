import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.layout";

import type { FC } from "react";

const Home = lazy(() => import("./pages/Home/Home.page"));
const Wanted = lazy(() => import("./pages/Wanted/Wanted.page"));

const App: FC = () => {
  return (
    <div className="App">
      <Suspense>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/wanted" element={<Wanted />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
