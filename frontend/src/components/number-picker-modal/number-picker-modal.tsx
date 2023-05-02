import { Component, Setter, createSignal } from "solid-js";
import CheckoutButton from "../checkout-button";

const NumberPickerModal: Component<{ poolId: string; setBuyForPoolId: Setter<string> }> = ({
  poolId,
  setBuyForPoolId,
}) => {
  return (
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-2 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                    Pick Your Lottery Numbers!
                  </h3>
                  <div class="mt-2 mb-4">
                    <p class="text-sm text-gray-500">Pick the numbers for your lottery ticket</p>
                    <button
                      class="border-hover border-2 px-4 text-sm rounded text-hover my-2 hover:bg-hover hover:text-white transition-colors"
                      onclick={() => setNumbers(generateRandomNumbers(6, 0, 69))}
                    >
                      Randomize!
                    </button>
                  </div>
                  <div class="flex mb-2 gap-2">
                    <input
                      class="appearance-none block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="number"
                      placeholder="00"
                      maxlength="2"
                      value={numbers()[0]}
                      onChange={(e) =>
                        setNumbers((prev) => {
                          prev[0] = parseInt(e.currentTarget.value);
                          return prev;
                        })
                      }
                    />
                    <input
                      class="appearance-none block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="number"
                      placeholder="00"
                      maxlength="2"
                      value={numbers()[1]}
                      onChange={(e) =>
                        setNumbers((prev) => {
                          prev[0] = parseInt(e.currentTarget.value);
                          return prev;
                        })
                      }
                    />
                    <input
                      class="appearance-none block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="number"
                      placeholder="00"
                      maxlength="2"
                      value={numbers()[2]}
                      onChange={(e) =>
                        setNumbers((prev) => {
                          prev[0] = parseInt(e.currentTarget.value);
                          return prev;
                        })
                      }
                    />
                    <input
                      class="appearance-none block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="number"
                      placeholder="00"
                      maxlength="2"
                      value={numbers()[3]}
                      onChange={(e) =>
                        setNumbers((prev) => {
                          prev[0] = parseInt(e.currentTarget.value);
                          return prev;
                        })
                      }
                    />
                    <input
                      class="appearance-none block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="number"
                      placeholder="00"
                      maxlength="2"
                      value={numbers()[4]}
                      onChange={(e) =>
                        setNumbers((prev) => {
                          prev[0] = parseInt(e.currentTarget.value);
                          return prev;
                        })
                      }
                    />
                    <input
                      class="appearance-none block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="number"
                      placeholder="00"
                      maxlength="2"
                      value={numbers()[5]}
                      onChange={(e) =>
                        setNumbers((prev) => {
                          prev[0] = parseInt(e.currentTarget.value);
                          return prev;
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-2 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <CheckoutButton numbers={numbers} poolId={poolId} />
              <button
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onclick={() => {
                  setNumbers([0, 0, 0, 0, 0, 0]);
                  setBuyForPoolId("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NumberPickerModal;

const [numbers, setNumbers] = createSignal([0, 0, 0, 0, 0, 0]);

const generateRandomNumbers = (count: number, min: number, max: number): number[] => {
  const randomNumbers: number[] = [];

  for (let i = 0; i < count; i++) {
    const randomNumber: number = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
};
