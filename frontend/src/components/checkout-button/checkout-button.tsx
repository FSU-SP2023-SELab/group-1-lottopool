import { useAuth0 } from "@rturnq/solid-auth0";
import { Accessor, Component, createResource } from "solid-js";
import { createSignal } from "solid-js";
// create a checkout button component that calls a post request to the backend to create a checkout session with redirect url

const CheckoutButton: Component<{ numbers: Accessor<number[]>; poolId: string }> = ({
  numbers,
  poolId,
}) => {
  const auth = useAuth0();
  const [userToken] = createResource(() => auth && auth.getToken());
  const [sessionUrl, setSessionUrl] = createSignal("");
  return (
    <button
      type="button"
      class="inline-flex w-full justify-center rounded bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-hover sm:ml-3 sm:w-auto"
      onclick={async () => {
        const stringNumbers = getTicketNumsAsString(numbers());
        const ticketNums = "LOT40:WPD01XNMNJNS" + stringNumbers;
        const body = {
          ticketNums: ticketNums,
          poolId: poolId,
        };
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-checkout-session`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${userToken()}` },
            body: JSON.stringify(body),
          }
        );
        const data = await response.json();
        setSessionUrl(data.redirect);
        if (sessionUrl() != "") window.location.href = sessionUrl();
      }}
    >
      Buy Ticket
    </button>
  );
};

const getTicketNumsAsString = (numbersArray: number[]) => {
  const stringArray: string[] = [];
  numbersArray.forEach((num) => {
    let stringNum = num.toString();
    if (stringNum.length == 1) stringNum = "0" + stringNum;
    else if (stringNum.length == 0) stringNum = "00";
    else if (stringNum.length > 2) stringNum = stringNum.slice(0, 2);
    stringArray.push(stringNum);
  });
  return stringArray.join("");
};

export default CheckoutButton;
