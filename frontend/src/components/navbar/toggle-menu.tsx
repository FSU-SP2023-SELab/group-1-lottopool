import { useAuth0 } from "@rturnq/solid-auth0";
import { Show } from "solid-js";
import { User } from "../../types";

const ToggleMenu = () => {
  const auth = useAuth0();

  return (
    <button class="hover:bg-slate-200 p-2 rounded">
      <Show
        when={auth?.user()}
        fallback={
          <svg
            class="text-primary w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
        }
      >
        <img
          class="h-10 rounded-full border-primary border-2"
          src={(auth?.user() as User)?.picture}
        />
      </Show>
    </button>
  );
};

export default ToggleMenu;
