import { useAuth0 } from "@rturnq/solid-auth0";
import { Component } from "solid-js";

const LoginButton: Component = () => {
  const auth = useAuth0();
  return (
    <button
      class="border-2 border-primary text-primary font-bold rounded w-36 h-12 hover:bg-primary hover:text-white transition-colors"
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
