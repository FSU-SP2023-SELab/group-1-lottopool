import { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import HomePage from "./routes/home-page";
import Navbar from "./components/navbar";
import ProfilePage from "./routes/profile-page";

const App: Component = () => {
  return (
    <div class="min-h-screen">
      <Navbar />
      <Routes>
        <Route path={"/"} component={HomePage} />
        <Route path={"/profile"} component={ProfilePage} />
      </Routes>
    </div>
  );
};

export default App;
