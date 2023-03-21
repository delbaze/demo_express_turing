import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ALL_WILDERS } from "./App";
describe("Demo", () => {
  it("loading", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <App />
      </MockedProvider>
    );
    expect(screen.queryByText(/Loading/i)).toBeInTheDocument();
  });

  it("liste wilders", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_ALL_WILDERS,
            },
            result: {
              data: {
                readWilders: [
                  {
                    name: "Demo",
                    id: 1,
                    city: null,
                    bio: null,
                    avatarUrl: null,
                  },
                ],
              },
            },
          },
        ]}
        addTypename={false}
      >
        <App />
      </MockedProvider>
    );
    const element = await waitFor(() => screen.getByText("Demo"));
    expect(element).toBeInTheDocument();
  });

  it("errors wilders", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_ALL_WILDERS,
            },
            result: {
              errors: [new Error("Error!")],
            },
          },
        ]}
        addTypename={false}
      >
        <App />
      </MockedProvider>
    );
    const element = await waitFor(() => screen.getByText("Error :"));
    expect(element).toBeInTheDocument();
  });
});
