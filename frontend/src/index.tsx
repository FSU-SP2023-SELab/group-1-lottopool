import { render } from "solid-js/web";
import "./index.css";
import App from "./App";
import { Auth0 } from "@rturnq/solid-auth0";
import { Router } from "@solidjs/router";

render(
  () => (
    <Auth0
      domain={import.meta.env.VITE_AUTH0_DOMAIN} // domain from Auth0
      clientId={import.meta.env.VITE_AUTH0_CLIENTID} // client_id from Auth0
      audience={import.meta.env.VITE_AUTH0_AUDIENCE} // implement with backend
      logoutRedirectUri={`${window.location.origin}`} // Absolute URI Auth0 logout redirect
      loginRedirectUri={`${window.location.origin}`} // Absolute URI Auth0 login
    >
      <Router>
        <App />
      </Router>
    </Auth0>
  ),
  document.getElementById("root") as HTMLElement
);
