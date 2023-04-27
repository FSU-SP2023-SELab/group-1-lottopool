import { Component } from "solid-js";
import powerballLogo from "../../assets/powerball_logo.jpg";

const PoolCard: Component = () => {
  return (
    <div class="bg-slate-100 rounded p-4 border-primary border-2">
      <p class="text-sm">Next Pool:</p>
      <div class="my-8 flex flex-col gap-2">
        <p class="font-semibold text-lg">Wednesday, April 23, 2023</p>
        <img class="h-6 w-fit" src={powerballLogo} />
        <p class="font-bold text-3xl">$170 Million</p>
        <p class="font-semibold text-md text-primary">20 People Entered</p>
      </div>
      <button class="w-full text-center bg-primary text-white h-12 rounded font-semibold text-lg hover:bg-hover">
        Buy Tickets
      </button>
    </div>
  );
};

export default PoolCard;
