import { useAuth0 } from "@rturnq/solid-auth0";
import { Component, Show } from "solid-js";
import PoolCard from "../../components/pool-card";

const DashboardPage: Component = () => {
  const auth = useAuth0();

  return (
    <div class="max-w-3xl mx-auto py-3 px-4">
      <Show
        when={auth?.user()}
        fallback={<p class="text-center text-lg text-primary">No User Logged In</p>}
      >
        <div class="flex justify-center items-center gap-4 w-full mb-8">
          <div class="bg-primary text-white rounded flex flex-col flex-1 p-4">
            <h2 class="text-xl font-bold">Earnings:</h2>
            <p class="text-2xl font-bold">$0</p>
          </div>

          <div class="bg-primary text-white rounded flex flex-col flex-1 p-4">
            <h2 class="text-xl font-bold">Tickets:</h2>
            <p class="text-2xl font-bold">0</p>
          </div>
        </div>

        <PoolCard />
      </Show>
    </div>
  );
};

export default DashboardPage;
