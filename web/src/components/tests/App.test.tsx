import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

test("on initialization shows fallback, after fetch shows movies", async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(await screen.findByText(/no movies yet/i)).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /matrix$/i }));

  await waitFor(async () => {
    expect(await screen.findByText("Matrix")).toBeInTheDocument();
    expect(screen.getByText("Matrix Reloaded")).toBeInTheDocument();
  });
});
