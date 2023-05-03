import { useAuth0 } from "@rturnq/solid-auth0";
import { Component, Resource, Show, createResource } from "solid-js";
import { iUserTickets } from "../../types";
import { LoadingTicket } from "../../components/loading-indicator";
import { Link, useParams } from "@solidjs/router";
import { AdminTicketCard } from "../../components/ticket-card";

const AdminTicketsPage: Component = () => {
  const auth = useAuth0();
  const params = useParams();
  const [userToken] = createResource(() => auth && auth.getToken());

  const fetchTickets = async (userToken: Resource<string | undefined>): Promise<iUserTickets> => {
    try {
      const result = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/list_tickets/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (result.status == 200) return await result.json();
      if (result.status == 401) return Promise.reject("You are not authorized");
    } catch (e) {
      return Promise.reject(e);
    }
    return Promise.reject("An error has occured");
  };

  const [tickets] = createResource(userToken, fetchTickets);

  return (
    <div class="max-w-3xl mx-auto py-3 px-4 min-h-[calc(100vh-5rem-72px)]">
      <Show
        when={auth?.user()}
        fallback={<p class="text-center text-lg text-primary">No User Logged In</p>}
      >
        <Link href="/admin" class="text-primary flex gap-2 font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>{" "}
          Go Back
        </Link>
        <h1 class="text-4xl text-primary font-bold mt-4">Tickets for Pool</h1>
        <h2 class="text-xl text-primary font-bold mb-8">{params.id}</h2>
        <div class="flex flex-col gap-2">
          <h2 class="text-2xl text-primary font-bold mt-4">Not Acquired</h2>
          {tickets.loading && <LoadingTicket />}
          {tickets()
            ?.tickets?.filter((t) => !t.acquired)
            .map((t) => (
              <AdminTicketCard ticket={t} />
            ))}
          <h2 class="text-2xl text-primary font-bold mt-4">Acquired</h2>
          {tickets.loading && <LoadingTicket />}
          {tickets()
            ?.tickets?.filter((t) => t.acquired)
            .map((t) => (
              <AdminTicketCard ticket={t} />
            ))}
          {tickets()?.tickets?.length == 0 && "No Tickets For This Pool"}
        </div>
      </Show>
    </div>
  );
};

export default AdminTicketsPage;
