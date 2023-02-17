import { Component } from "solid-js";
import HelloWorldExample from "./components/hello-world-example";

const App: Component = () => {
  return (
    <div class="text-center pt-16 bg-slate-100 h-screen">
      <h1 class="text-6xl mb-8 font-bold">Lottopool</h1>
      <HelloWorldExample />
    </div>
  );
};

export default App;
