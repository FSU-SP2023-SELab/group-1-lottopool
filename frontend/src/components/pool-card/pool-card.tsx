import { Component, Show } from "solid-js";
import powerballLogo from "../../assets/powerball_logo.jpg";
import { iUserPool } from "../../routes/dashboard-page/types";
import CheckoutButton from "../checkout-button";

const PoolCard: Component<{ pool: iUserPool }> = (props: { pool: iUserPool }) => {
  const enteredPool = props.pool.my_tickets.length > 0;
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div class="bg-slate-100 rounded p-4 border-primary border-2 relative w-full">
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

      <p class="font-bold">{props.pool.name}</p>
      <div class="my-8 flex flex-col gap-2">
        <div>
          <p class="text-sm">
            Started: {new Date(props.pool.start).toLocaleDateString("en-US", dateOptions)}
          </p>
          <p class="font-semibold text-lg">
            Ending: {new Date(props.pool.end).toLocaleDateString("en-US", dateOptions)}
          </p>
        </div>
        <img class="h-6 w-fit" src={powerballLogo} />
        <p class="font-bold text-3xl">${props.pool.jackpot.toLocaleString("en-US")} Jackpot</p>
        <p class="font-semibold text-md text-primary">
          {props.pool.user_count} {props.pool.user_count == 1 ? "Person" : "People"} Entered
        </p>
        <p class="font-semibold text-md text-primary">
          {props.pool.tix_count} {props.pool.tix_count == 1 ? "Ticket" : "Tickets"} Bought
        </p>
      </div>
      <CheckoutButton />
      {enteredPool ? (
        <button class="w-full text-center border-primary border-2 text-primary h-12 rounded font-semibold text-lg hover:bg-hover hover:text-white hover:border-hover">
          Buy More Tickets for ${props.pool.ppt}
        </button>
      ) : (
        <button class="w-full text-center bg-primary text-white h-12 rounded font-semibold text-lg hover:bg-hover">
          Buy Tickets for ${props.pool.ppt}
        </button>
      )}

      <Show when={enteredPool}>
        <div class="mt-8">
          <p class="font-bold">
            Entered with {props.pool.my_tickets.length}
            {props.pool.my_tickets.length == 1 ? " Ticket" : " Tickets"}
          </p>
          <p class="font-bold">
            Potential Earnings: $
            {(
              (props.pool.jackpot / props.pool.tix_count) *
              props.pool.my_tickets.length
            ).toLocaleString("en-US")}
          </p>
        </div>
      </Show>
    </div>
  );
};

export default PoolCard;
