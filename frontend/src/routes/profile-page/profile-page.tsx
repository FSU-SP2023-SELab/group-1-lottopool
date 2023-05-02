import { useAuth0 } from "@rturnq/solid-auth0";
import { Component, Show } from "solid-js";

const ProfilePage: Component = () => {
  const auth = useAuth0();

  return (
    <div class="max-w-3xl mx-auto flex flex-col items-center justify-between  py-8 px-4 gap-4">
      <Show when={auth?.user()} fallback={<p class="text-lg">No User Logged In</p>}>
        <img class="rounded-full" src={auth?.user()["picture"]} />
        <h1 class="text-3xl font-bold mb-8">{auth?.user()["name"]}</h1>
        <div class="text-left">
          <p class="text-lg mb-4">
            <span class="font-bold">Username:</span> {auth?.user()["nickname"]}
          </p>
          <p class="text-lg mb-4">
            <span class="font-bold">Email:</span> {auth?.user()["email"]}
          </p>
        </div>
      </Show>
    </div>
  );
};

export default ProfilePage;
