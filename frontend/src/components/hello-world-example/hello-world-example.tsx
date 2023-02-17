import { Component, Suspense, createResource, createSignal } from "solid-js";

// function to call backend api
const fetchMessage = async <T extends unknown>(): Promise<T> =>
  (await fetch(`http://localhost:8000/api/hello-world`)).json();

// component that holds a button to call the api and display its message
const HelloWorldExample: Component = () => {
  const [showMessage, setShowMessage] = createSignal(false);
  const [message] = createResource<HelloMessage>(fetchMessage);

  return (
    <div class="text-center pt-16 bg-slate-100 h-screen">
      <button
        class="bg-black p-4 rounded-md text-white"
        type="button"
        onClick={() => setShowMessage(true)}
      >
        Say Hello to API
      </button>

      {showMessage() && (
        <div class="mt-8">
          <Suspense fallback={<p>Loading...</p>}>
            <pre>{message()?.message}</pre>
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default HelloWorldExample;
