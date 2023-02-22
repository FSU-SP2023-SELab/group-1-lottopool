import { screen, render, fireEvent } from "@solidjs/testing-library";
import { describe, expect, test, vi } from "vitest";
import HelloWorldExample from "../components/hello-world-example";

describe("Hello World Component", async () => {
  test("Click event success", async () => {
    render(() => <HelloWorldExample />);
    const component = await screen.findByRole("button");
    expect(component).toBeInTheDocument();

    // mock fetch to deliver api json
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Hello from the API" }),
      })
    ) as never;

    fireEvent.click(component);
    expect(await screen.findByText("Hello from the API")).toBeInTheDocument();
  });

  test("Click event failure", async () => {
    render(() => <HelloWorldExample />);
    const component = await screen.findByRole("button");
    expect(component).toBeInTheDocument();
    // mock fetch to error api
    global.fetch = vi.fn(() => Promise.reject()) as never;

    fireEvent.click(component);
    expect(await screen.findByText("Uh Oh! something went wrong :(")).toBeInTheDocument();
  });
});
