import { useAuth0 } from "@rturnq/solid-auth0";
import { Component, Resource, Show, createEffect, createResource } from "solid-js";
import PoolCard from "../../components/pool-card";
import { iCurrentPools, iDashboard } from "./types";

const fetchDashboard = async (userToken: Resource<string | undefined>): Promise<iDashboard> => {
  try {
    const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/dashboard`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (result.status == 200) return await result.json();
    if (result.status == 401) return Promise.reject("You are not authorized");
  } catch (e) {
    return Promise.reject(e);
  }
  return Promise.reject("An error has occured");
};

const fetchPools = async (userToken: Resource<string | undefined>): Promise<iCurrentPools> => {
  try {
    const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/current_pools`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (result.status == 200) return await result.json();
    if (result.status == 401) return Promise.reject("You are not authorized");
  } catch (e) {
    return Promise.reject(e);
  }
  return Promise.reject("An error has occured");
};

const DashboardPage: Component = () => {
  const auth = useAuth0();
  const [userToken] = createResource(() => auth && auth.getToken());
  const [dashboard] = createResource(userToken, fetchDashboard);
  const [currentPools] = createResource(userToken, fetchPools);

  return (
    <div class="max-w-3xl mx-auto py-3 px-4 min-h-[calc(100vh-5rem-72px)]">
      <Show
        when={auth?.user()}
        fallback={<p class="text-center text-lg text-primary">No User Logged In</p>}
      >
        <div class="flex justify-center items-center gap-4 w-full mb-8">
          <div class="bg-primary text-white rounded flex flex-col flex-1 p-4">
            <h2 class="text-xl font-bold">Balance:</h2>
            <p class="text-2xl font-bold">${dashboard()?.balance.toFixed(2) ?? "--"}</p>
          </div>

          <div class="bg-primary text-white rounded flex flex-col flex-1 p-4">
            <h2 class="text-xl font-bold">Tickets:</h2>
            <p class="text-2xl font-bold">{dashboard()?.cur_tickets.length ?? "--"}</p>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center gap-4">
          {currentPools()?.pools?.map((p) => (
            <PoolCard pool={p} />
          ))}
        </div>
      </Show>
    </div>
  );
};

export default DashboardPage;
