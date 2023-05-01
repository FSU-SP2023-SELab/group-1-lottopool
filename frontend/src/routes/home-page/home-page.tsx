import { Component, Show, createResource } from "solid-js";
import mainArt from "../../assets/main_art.svg";
import { useAuth0 } from "@rturnq/solid-auth0";
import { Link } from "@solidjs/router";
import { iLanding } from "./types";

const fetchLanding = async (): Promise<iLanding> => {
  try {
    const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/landing`);
    if (result.status == 200) return await result.json();
  } catch (e) {
    console.log("ERROR", e);
    return Promise.reject(e);
  }
  return Promise.reject("An error has occured");
};

const HomePage: Component = () => {
  const auth = useAuth0();
  const [landing] = createResource(fetchLanding);

  return (
    <div class="max-w-3xl mx-auto flex flex-col items-center justify-between min-h-[calc(100vh-5rem-72px)] py-8 px-4 gap-4">
      <h1 class="text-4xl lg:text-5xl font-bold mb-8 text-center text-primary">
        Get higher chances of winning by pooling your tickets
      </h1>
      <img class="w-96" src={mainArt} />
      <p class="font-semibold text-slate-900 text-center w-48">
        <span class="text-primary text-2xl font-bold ">
          {landing()?.user_count ?? "A lot of people"}
        </span>{" "}
        {landing()?.user_count == 1 ? "person has" : "people have"} already entered the next pool!
      </p>
      <Show
        when={auth?.isAuthenticated()}
        fallback={
          <button
            class="bg-primary w-full text-lg max-w-sm h-16 text-white font-bold rounded hover:bg-hover transition-colors"
            onClick={() => auth?.loginWithRedirect()}
          >
            Join Today
          </button>
        }
      >
        <Link
          class="bg-primary w-full text-lg max-w-sm h-16 text-white font-bold rounded hover:bg-hover transition-colors flex items-center justify-center"
          href="/dashboard"
        >
          Go To Dashboard
        </Link>
      </Show>
    </div>
  );
};

export default HomePage;
