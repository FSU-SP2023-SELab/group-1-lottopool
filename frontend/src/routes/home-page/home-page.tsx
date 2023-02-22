import { useAuth0 } from "@rturnq/solid-auth0";
import { Component, createResource, Resource, Suspense } from "solid-js";

const fetchProtected = async (userToken: Resource<string | undefined>): Promise<MessageTest> =>
  (
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/protected`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
  ).json();

const HomePage: Component = () => {
  const auth = useAuth0();
  const [userToken] = createResource(() => auth && auth.getToken());
  const [message] = createResource(userToken, fetchProtected);

  return (
    <div>
      <div class="">
        <Suspense fallback={<p>no image</p>}>
          <img src={(auth?.user() as any)?.picture}></img>
        </Suspense>
        <div>user: {JSON.stringify(auth?.user())}</div>
        <div>user token: {JSON.stringify(userToken())}</div>
        <div>isAuthenticated: {JSON.stringify(auth?.isAuthenticated())}</div>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <p>protected: {message()?.text}</p>
      </Suspense>
    </div>
  );
};

export default HomePage;
