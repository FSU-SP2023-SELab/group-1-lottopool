import { Component } from "solid-js";
import powerballLogo from "../../assets/powerball_logo.jpg";

const PoolCard: Component = () => {
  return (
    <div class="bg-slate-100 rounded p-4 border-primary border-2 relative">
      <a
        class="absolute top-4 right-4"
        href="https://www.flalottery.com/powerball"
        target="_blank"
        rel="noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </a>

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
