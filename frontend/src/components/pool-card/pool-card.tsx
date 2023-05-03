import { Component, Setter, Show, createResource } from "solid-js";
import powerballLogo from "../../assets/powerball_logo.png";
import cash4LifeLogo from "../../assets/cash4life_logo.png";
import megaMillionLogo from "../../assets/mega_million_logo.png";
import floridaLottoLogo from "../../assets/florida_lotto_logo.png";
import { iUserPool } from "../../types";
import { useAuth0 } from "@rturnq/solid-auth0";
import { Link } from "@solidjs/router";

const PoolCard: Component<{
  pool: iUserPool;
  setBuyForPoolId?: Setter<string>;
  admin?: boolean;
}> = ({ pool, setBuyForPoolId, admin = false }) => {
  const enteredPool = pool.my_tickets.length > 0;
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div
      class={`${
        pool.won ? "bg-primary-100" : "bg-slate-50"
      } rounded p-4 border-primary border-2 relative w-full`}
    >
      <a
        class="absolute top-4 right-4"
        href={getPoolLink(pool.name)}
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

      <PoolImage name={pool.name} />
      <p class="font-bold">{pool.name}</p>
      <div class="my-8 flex flex-col gap-2">
        <div>
          <p class="text-sm">
            Started: {new Date(pool.start).toLocaleDateString("en-US", dateOptions)}
          </p>
          <p class="font-semibold text-lg">
            Ending: {new Date(pool.end).toLocaleDateString("en-US", dateOptions)}
          </p>
        </div>

        <p class="font-bold text-3xl my-4">${pool.jackpot.toLocaleString("en-US")} Jackpot</p>
        <p class="font-semibold text-md text-primary">
          {pool.user_count} {pool.user_count == 1 ? "Person" : "People"} Entered&ensp;|&ensp;
          {pool.tix_count} {pool.tix_count == 1 ? "Ticket" : "Tickets"} Total
          <Show when={enteredPool}>
            <p class="font-semibold text-black">
              Entered with {pool.my_tickets.length}
              {pool.my_tickets.length == 1 ? " Ticket" : " Tickets"}&ensp;|&ensp;Potential Earnings:
              ${((pool.jackpot / pool.tix_count) * pool.my_tickets.length).toLocaleString("en-US")}
            </p>
          </Show>
        </p>
      </div>
      <Show when={!admin} fallback={<AdminSection pool={pool} />}>
        {enteredPool ? (
          <button
            class="w-full text-center border-primary border-2 text-primary h-12 rounded font-semibold text-lg hover:bg-hover hover:text-white hover:border-hover"
            onclick={() => setBuyForPoolId && setBuyForPoolId(pool.id)}
          >
            Buy More Tickets for ${pool.ppt}
          </button>
        ) : (
          <button
            class="w-full text-center bg-primary text-white h-12 rounded font-semibold text-lg hover:bg-hover"
            onclick={() => setBuyForPoolId && setBuyForPoolId(pool.id)}
          >
            Buy Tickets for ${pool.ppt}
          </button>
        )}
      </Show>
    </div>
  );
};

const AdminSection: Component<{ pool: iUserPool }> = ({ pool }) => {
  const auth = useAuth0();
  const [userToken] = createResource(() => auth && auth.getToken());

  const submitMarkPoolWon = async () => {
    const body = {
      pool_id: pool.id,
      won: !pool.won,
    };
    try {
      const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/admin/mark_won`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (result.status == 200) location.reload();
      if (result.status == 401) return Promise.reject("You are not authorized");
    } catch (e) {
      return Promise.reject(e);
    }
    return Promise.reject("An error has occured");
  };

  const submitTixAcquired = async () => {
    const body = {
      pool_id: pool.id,
      picture_url: "",
    };
    try {
      const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/admin/set_pool_acquired`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (result.status == 200) return await result.json();
      if (result.status == 401) return Promise.reject("You are not authorized");
    } catch (e) {
      return Promise.reject(e);
    }
    return Promise.reject("An error has occured");
  };

  return (
    <div>
      <p>
        <span class="font-semibold">Id: </span>
        {pool.id}
      </p>
      <p>
        <span class="font-semibold">Agency Id: </span>
        {pool.agency_id}
      </p>
      <div class="flex gap-2 flex-wrap mt-4">
        <button
          class={`${
            pool.won
              ? "bg-white border-hover border-2 text-primary hover:text-white"
              : "bg-primary text-white"
          } rounded px-8 py-2 hover:bg-hover transition-colors`}
          onclick={() => submitMarkPoolWon()}
        >
          {pool.won ? "Mark Pool as Not Won" : "Mark Pool as Won"}
        </button>
        <button
          class="bg-primary text-white rounded px-8 py-2 hover:bg-hover transition-colors"
          onclick={() => submitTixAcquired()}
        >
          Set Tickets Acquired
        </button>
        <Link
          class="bg-primary text-white rounded px-8 py-2 hover:bg-hover transition-colors"
          href={`/admin/tickets/${pool.id}`}
        >
          View Tickets
        </Link>
      </div>
    </div>
  );
};

const getPoolLink = (name: string) => {
  if (name.toLowerCase().includes("powerball")) return "https://www.flalottery.com/powerball";
  else if (name.toLowerCase().includes("cash4life")) return "https://www.flalottery.com/cash4Life";
  else if (name.toLowerCase().includes("mega")) return "https://www.megamillions.com/";
  return "https://www.flalottery.com/lotto";
};

const PoolImage: Component<{ name: string }> = ({ name }) => {
  if (name.toLowerCase().includes("powerball"))
    return <img class="h-6 w-fit" src={powerballLogo} />;
  else if (name.toLowerCase().includes("cash4life"))
    return <img class="h-8 w-fit" src={cash4LifeLogo} />;
  else if (name.toLowerCase().includes("mega"))
    return <img class="h-8 w-fit" src={megaMillionLogo} />;
  return <img class="h-8 w-fit" src={floridaLottoLogo} />;
};

export default PoolCard;
