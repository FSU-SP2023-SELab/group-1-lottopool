import { useAuth0 } from "@rturnq/solid-auth0";
import { Component, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import { fetchPools } from "../dashboard-page/dashboard-page";
import PoolCard from "../../components/pool-card";
import { LoadingPool } from "../../components/loading-indicator";

const AdminPage: Component = () => {
  const auth = useAuth0();
  const [userToken] = createResource(() => auth && auth.getToken());
  const [currentPools] = createResource(userToken, fetchPools);
  const [form, setForm] = createStore({
    name: "",
    agency_id: "",
    jackpot: "",
    ppt: "",
    start: null,
    end: null,
    won: false,
  });

  const updateFormField = (fieldName: string) => (event: Event) => {
    const inputElement = event.currentTarget as HTMLInputElement;
    setForm({
      [fieldName]: inputElement.value,
    });
  };

  const submitAddPool = async (e: Event) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = {
      name: form.name,
      agency_id: form.agency_id,
      jackpot: parseInt(form.jackpot),
      ppt: parseInt(form.ppt),
    };
    try {
      const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/admin/add_pool`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (result.status == 200) return await result.json();
      if (result.status == 401) return Promise.reject("You are not authorized");
    } catch (e) {
      return Promise.reject(e);
    }
    return Promise.reject("An error has occured");
  };

  return (
    <div class="max-w-3xl mx-auto py-3 px-4 min-h-[calc(100vh-5rem-72px)]">
      <h1 class="text-4xl text-primary font-bold mb-8">Admin Page</h1>
      <form class="w-full border rounded p-4" onSubmit={(e) => submitAddPool(e)}>
        <h2 class="text-xl font-bold mb-4 text-gray-800">Add A Pool</h2>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/2 px-3 mb-2 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="name"
            >
              Pool Name
            </label>
            <input
              class="appearance-none block w-full bg-slate-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              placeholder="Pool Name"
              onChange={updateFormField("name")}
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="agency_id"
            >
              Agency Id
            </label>
            <input
              class="appearance-none block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="agency_id"
              type="text"
              placeholder="415dab3d-e524-11ed-9ffa-0242ac140002"
              onChange={updateFormField("agency_id")}
            />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="jackpot"
            >
              Jackpot
            </label>
            <input
              class="appearance-none block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="jackpot"
              type="number"
              placeholder="20000"
              onChange={updateFormField("jackpot")}
            />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="ppt"
            >
              Price Per Ticket
            </label>
            <input
              class="appearance-none block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="ppt"
              type="number"
              placeholder="2"
              onChange={updateFormField("ppt")}
            />
          </div>

          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="won">
              Won
            </label>
            <input class="mx-4" id="won" type="checkbox" onChange={updateFormField("won")} />
          </div>
        </div>

        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="start"
            >
              Start Date
            </label>
            <input
              class="appearance-none block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="start"
              type="date"
              onChange={updateFormField("start")}
            />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="end"
            >
              End Date
            </label>
            <input
              class="appearance-none block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="end"
              type="date"
              onChange={updateFormField("end")}
            />
          </div>

          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 flex items-end">
            <button class="w-full h-12 rounded text-white bg-primary hover:bg-hover" type="submit">
              Add Pool
            </button>
          </div>
        </div>
      </form>

      <h2 class="text-3xl text-primary font-bold my-12 mb-4">Current Pools</h2>
      <div class="flex flex-col items-center justify-center gap-4">
        {currentPools.loading && (
          <>
            <LoadingPool />
            <LoadingPool />
          </>
        )}
        {currentPools()?.pools?.map((p) => (
          <PoolCard pool={p} admin />
        ))}
      </div>
    </div>
  );
};
export default AdminPage;
