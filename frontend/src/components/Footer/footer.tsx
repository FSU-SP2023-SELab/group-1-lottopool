import { Component } from "solid-js";
import { Link } from "@solidjs/router";

const Footer: Component = () => {
  return (
    <footer class="bg-gray-100 py-6">
      <div class="max-w-4xl mx-auto px-4">
        <nav class="flex justify-center gap-12 items-center text-primary font-bold">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/how">How It Works</Link>
          <Link href="/about">About Us</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
