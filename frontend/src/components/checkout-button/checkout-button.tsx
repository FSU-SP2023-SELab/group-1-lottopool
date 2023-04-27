import { useAuth0 } from "@rturnq/solid-auth0";
import { Component } from "solid-js";
import { createSignal } from "solid-js";
//create a checkout button component that calls a post request to the backend to create a checkout session with redirect url

const CheckoutButton: Component = () => {
  const auth = useAuth0();
  const [sessionUrl, setSessionUrl] = createSignal("");
  //creating these varaibles as signals for now, not sure what the best way to set them is
  const [ticketNums, setTicketNums] = createSignal("");
  const [poolId, setPoolId] = createSignal("");
  return (
    <button
      class="bg-black text-white rounded w-24 h-12"
      onclick={async () => {
        const authId = auth?.user()["sub"];
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-checkout-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Auth-Token": authId,
              "Ticket-Nums": ticketNums(),
              "Pool-Id": poolId(),
            },
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
