import { useAuth0 } from "@rturnq/solid-auth0";
import { Component, createResource } from "solid-js";
import { createSignal } from "solid-js";
//create a checkout button component that calls a post request to the backend to create a checkout session with redirect url

const CheckoutButton: Component = () => {
  const auth = useAuth0();
  const [userToken] = createResource(() => auth && auth.getToken());
  const [sessionUrl, setSessionUrl] = createSignal("");
  //creating these varaibles as signals for now, not sure what the best way to set them is
  const [ticketNums, setTicketNums] = createSignal("1234567");
  const [poolId, setPoolId] = createSignal("7654321");
  return (
    <button
      class="bg-black text-white rounded w-24 h-12"
      onclick={async () => {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-checkout-session?` +
            new URLSearchParams({ ticketNums: ticketNums(), poolId: poolId() }),
          {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken()}` },
          }
        );
        const data = await response.json();
        setSessionUrl(data.redirect);
        if (sessionUrl() != "") window.location.href = sessionUrl();
      }}
    >
      Buy a ticket
    </button>
  );
};
export default CheckoutButton;
