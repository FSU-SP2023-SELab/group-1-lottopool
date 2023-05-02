import { Component, Show } from "solid-js";
import { Link } from "@solidjs/router";
import { useAuth0 } from "@rturnq/solid-auth0";

const Footer: Component = () => {
  const auth = useAuth0();
  return (
    <footer class="bg-gray-100 py-6">
      <div class="max-w-4xl mx-auto px-4">
        <nav class="flex justify-center gap-12 items-center text-primary font-bold">
          <Show when={auth?.user()}>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Profile</Link>
          </Show>
          <Link href="/how">How It Works</Link>
          <Link href="/about">About Us</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
