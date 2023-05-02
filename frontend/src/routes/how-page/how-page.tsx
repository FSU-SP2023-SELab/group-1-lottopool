import { Link } from "@solidjs/router";
import { Component } from "solid-js";

const HowPage: Component = () => {
  return (
    <div class="max-w-3xl mx-auto py-3 px-4 min-h-[calc(100vh-5rem-72px)]">
      <h1 class="text-4xl text-primary font-bold mb-8">How It Works</h1>
      <p>
        Florida Lottery Pool offers an innovative platform for participating in lottery pools with
        ease. Our mission is to help you maximize your chances of winning by pooling tickets with
        other players. Here's how it works:
      </p>
      <ol class="list-decimal list-inside mt-8">
        <li class="mt-4">
          <strong>Create an account:</strong> Sign up on our platform with a secure authentication
          process powered by Auth0.
        </li>
        <li class="mt-4">
          <strong>Choose a pool:</strong> Browse through our selection of lottery pools on the
          <Link href="/dashboard" class="text-primary font-bold">
            {" "}
            Dashboard
          </Link>{" "}
          and pick the one that best suits your preferences.
        </li>
        <li class="mt-4">
          <strong>Purchase tickets:</strong> Buy as many tickets as you'd like within a single pool
          or spread your bets across multiple pools.
        </li>
        <li class="mt-4">
          <strong>Win together:</strong> If any member of your pool hits the jackpot, the winnings
          are shared among all participants proportionally based on the number of tickets each
          player purchased.
        </li>
        <li class="mt-4">
          <strong>Secure transactions:</strong> All payments are processed using Stripe's reliable
          and secure infrastructure.
        </li>
      </ol>
      <p class="mt-8">
        Florida Lottery Pool leverages cutting-edge technology, combining Python for backend
        services and Solid.js for an optimized frontend experience. This ensures a seamless,
        user-friendly platform for participating in lottery pools and increasing your chances of
        winning big.
      </p>
    </div>
  );
};
export default HowPage;
