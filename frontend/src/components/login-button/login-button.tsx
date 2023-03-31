import { useAuth0 } from "@rturnq/solid-auth0";
import { Component } from "solid-js";

const LoginButton: Component = () => {
  const auth = useAuth0();
  return (
    <button
      class="bg-black text-white rounded w-24 h-12"
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
