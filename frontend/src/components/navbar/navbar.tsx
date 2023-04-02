import { Component, Show } from "solid-js";
import LoginButton from "../login-button";
import CheckoutButton from "../checkout-button";
import { useAuth0 } from "@rturnq/solid-auth0";
import { Link } from "@solidjs/router";
import { User } from "../../types";

const Navbar: Component = () => {
  const auth = useAuth0();

  return (
    <header class="flex justify-between content-center">
      <Link href="/">
        <h1 class="text-6xl mb-8 font-bold">Lottopool</h1>
      </Link>
      <div class="flex gap-4">
      <CheckoutButton />
        </div>
      <div class="flex gap-4">
        <LoginButton />
        <Show when={auth?.user()}>
          <Link href="/profile">
            <img class="h-12 rounded-full" src={(auth?.user() as User)?.picture} />
          </Link>
        </Show>
      </div>
    </header>
  );
};

export default Navbar;
