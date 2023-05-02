import { useAuth0 } from "@rturnq/solid-auth0";
import { Component, Resource, Show, createResource } from "solid-js";
import { iUserTickets } from "../../types";
import TicketCard from "../../components/ticket-card";

const fetchTickets = async (userToken: Resource<string | undefined>): Promise<iUserTickets> => {
  try {
    const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/tickets`, {
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

const TicketsPage: Component = () => {
  const auth = useAuth0();
  const [userToken] = createResource(() => auth && auth.getToken());
  const [tickets] = createResource(userToken, fetchTickets);

  return (
    <div class="max-w-3xl mx-auto py-3 px-4 min-h-[calc(100vh-5rem-72px)]">
      <Show
        when={auth?.user()}
        fallback={<p class="text-center text-lg text-primary">No User Logged In</p>}
      >
        <h1 class="text-4xl text-primary font-bold mb-8">My Tickets</h1>
        <div class="flex flex-col gap-2">
          {tickets()?.tickets?.map((t) => (
            <TicketCard ticket={t} />
          ))}
        </div>
      </Show>
    </div>
  );
};

export { TicketsPage };
