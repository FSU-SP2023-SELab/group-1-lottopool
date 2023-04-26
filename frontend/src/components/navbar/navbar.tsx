import { Component, Show, createSignal } from "solid-js";
import { useAuth0 } from "@rturnq/solid-auth0";
import { Link } from "@solidjs/router";
import { User } from "../../types";
import logo from "../../assets/lottopool_logo.svg";

const Navbar: Component = () => {
  const auth = useAuth0();
  const [openNav, setOpenNav] = createSignal(false);

  return (
    <header class="flex justify-between items-center max-w-4xl mx-auto h-20 px-4">
      <Link class="flex items-center justify-center gap-3" href="/">
        <img src={logo} width={48} />
        <h1 class="text-2xl  font-bold text-primary">Lottopool</h1>
      </Link>
      {/* <nav class="gap-12 items-center text-primary font-bold hidden md:flex">
        <Link href="/about">About Us</Link>
        <Link href="/how">How It Works</Link>
      </nav> */}
      <div class="relative inline-block text-left">
        <div>
          <button
            class="hover:bg-slate-200 p-2 rounded"
            onclick={() => setOpenNav((prev) => !prev)}
          >
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
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
              }
            >
              <img
                class="h-10 rounded-full border-primary border-2"
                src={(auth?.user() as User)?.picture}
              />
            </Show>
          </button>
        </div>

        <div
          class={` right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
            openNav() ? "absolute" : "hidden"
          }`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <Show when={auth?.user()}>
            <div class="py-1" role="none">
              <Link
                class="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabindex="-1"
                id="menu-item-0"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                class="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabindex="-1"
                id="menu-item-1"
                href="/profile"
              >
                Profile
              </Link>
            </div>
          </Show>
          <div class="py-1" role="none">
            <Link
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-2"
              href="/about"
            >
              About Us
            </Link>
            <Link
              class="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-3"
              href="/how"
            >
              How It Works
            </Link>
          </div>

          <div class="py-1" role="none">
            <button
              class="text-primary block px-4 py-2 text-sm"
              role="menuitem"
              tabindex="-1"
              id="menu-item-4"
              onclick={() => {
                if (!auth) return;
                if (auth.isAuthenticated()) {
                  auth.logout();
                } else {
                  auth.loginWithRedirect();
                }
              }}
            >
              {auth?.isAuthenticated() ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
