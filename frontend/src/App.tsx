import { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import HomePage from "./routes/home-page";
import LoginButton from "./components/login-button";

const App: Component = () => {
  return (
    <div class="bg-slate-100 h-screen p-8">
      <h1 class="text-6xl mb-8 font-bold">Lottopool</h1>
      <LoginButton />
      <Routes>
        <Route path={"/"} component={HomePage} />
      </Routes>
    </div>
  );
};

export default App;
