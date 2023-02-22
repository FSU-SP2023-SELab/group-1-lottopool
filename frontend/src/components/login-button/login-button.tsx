import { useAuth0 } from "@rturnq/solid-auth0";
import { Component, createResource } from "solid-js";

const LoginButton: Component = () => {
  const auth = useAuth0();
  const [userToken] = createResource(() => auth && auth.getToken());
  return (
    <button
      class="bg-black text-white rounded pt-1 pb-1 pl-4 pr-4"
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
  );
};
export default LoginButton;
