import { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import HomePage from "./routes/home-page";

const App: Component = () => {
  return (
    <div class="text-center pt-16 bg-slate-100 h-screen">
      <h1 class="text-6xl mb-8 font-bold">Lottopool</h1>
      <Routes>
        <Route path={"/"} component={HomePage} />
      </Routes>
    </div>
  );
};

export default App;
