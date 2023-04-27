import { Component } from "solid-js";
import mainArt from "../../assets/main_art.svg";
import { useAuth0 } from "@rturnq/solid-auth0";

// const fetchProtected = async (userToken: Resource<string | undefined>): Promise<MessageTest> => {
//   try {
//     const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/protected`, {
//       headers: {
//         Authorization: `Bearer ${userToken}`,
//       },
//     });
//     if (result.status == 200) return result.json();
//   } catch (e) {
//     console.log("ERROR", e);
//     return Promise.reject("You are not authorized");
//   }
//   return Promise.reject("An error has occured");
// };

const HomePage: Component = () => {
  const auth = useAuth0();
  //   const [userToken] = createResource(() => auth && auth.getToken());
  //   const [message] = createResource(userToken, fetchProtected);

  return (
    <div class="max-w-3xl mx-auto flex flex-col items-center justify-between h-[calc(100vh-5rem)] py-8 px-4 gap-4">
      <h1 class="text-4xl lg:text-5xl font-bold mb-8 text-center text-primary">
        Get higher chances of winning by pooling your tickets
      </h1>
      <img class="w-96" src={mainArt} />
      <p class="font-semibold text-slate-900 text-center w-48">
        <span class="text-primary text-2xl font-bold ">20</span> people have already entered the
        next pool!
      </p>
      <button
        class="bg-primary w-full max-w-sm h-16 text-white font-bold rounded hover:bg-hover transition-colors"
        onClick={() => auth?.loginWithRedirect()}
      >
        Join Today
      </button>
    </div>
  );
};

export default HomePage;
