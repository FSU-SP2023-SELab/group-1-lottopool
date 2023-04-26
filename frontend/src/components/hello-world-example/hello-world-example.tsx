import { Component, Suspense, createResource, createSignal } from "solid-js";

// function to call backend api
const fetchMessage = async (): Promise<HelloMessage> =>
  (await fetch(`${import.meta.env.VITE_BACKEND_URL}api/hello-world`)).json();

// component that holds a button to call the api and display its message
const HelloWorldExample: Component = () => {
  const [showMessage, setShowMessage] = createSignal(false);
  const [message, { refetch }] = createResource(showMessage, fetchMessage);

  return (
    <div class="text-center pt-16 bg-slate-100 h-screen">
      <button
        class="bg-black p-4 rounded-md text-white active:bg-gray-800"
        type="button"
        onClick={() => (showMessage() ? refetch() : setShowMessage(true))}
      >
        Say Hello to API
      </button>

      <div class="mt-8">
        {message.error ? (
          <pre class="text-red-500">{"Uh Oh! something went wrong :("}</pre>
        ) : (
          <Suspense fallback={<p>Loading...</p>}>
            <pre>{message()?.message}</pre>
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default HelloWorldExample;
