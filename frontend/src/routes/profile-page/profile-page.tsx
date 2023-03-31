import { useAuth0 } from "@rturnq/solid-auth0";
import { Component, Show } from "solid-js";

const ProfilePage: Component = () => {
  const auth = useAuth0();

  return (
    <div>
      <h1 class="text-3xl font-bold mb-8">Profile Page</h1>
      <Show when={auth?.user()} fallback={<p class="text-lg">No User Logged In</p>}>
        {Object.keys(auth?.user()).map((v) => (
          <p>
            <b>{v}</b>: {JSON.stringify(auth?.user()[v])}
          </p>
        ))}
      </Show>
    </div>
  );
};

export default ProfilePage;
