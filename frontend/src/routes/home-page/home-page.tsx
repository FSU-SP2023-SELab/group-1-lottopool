import { useAuth0 } from "@rturnq/solid-auth0";
import { Component, createResource, Resource, Suspense } from "solid-js";

const fetchProtected = async (userToken: Resource<string | undefined>): Promise<MessageTest> => {
  try {
    const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/protected`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (result.status == 200) return result.json();
  } catch (e) {
    console.log("ERROR", e);
    return Promise.reject("You are not authorized");
  }
  return Promise.reject("An error has occured");
};

const HomePage: Component = () => {
  const auth = useAuth0();
  const [userToken] = createResource(() => auth && auth.getToken());
  const [message] = createResource(userToken, fetchProtected);

  return (
    <div>
      <h1 class="text-3xl font-bold mb-8">Home Page</h1>
      <Suspense fallback={<p>loading user...</p>}>
        <b>isAuthenticated</b>: {JSON.stringify(auth?.isAuthenticated())}
      </Suspense>

      {message.error ? (
        <p>{JSON.stringify(message.error)}</p>
      ) : (
        <p>
          <b>Protected Route</b>: {message.loading ? "Loading..." : message()?.text}
        </p>
      )}
    </div>
  );
};

export default HomePage;
