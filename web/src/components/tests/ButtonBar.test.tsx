import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonBar from "../ButtonBar";

test("calls onFetch with correct query and shows spinner on active button", async () => {
  const user = userEvent.setup();
  const onFetch = vi.fn();

  const { rerender } = render(
    <ButtonBar onFetch={onFetch} loading={null as any} />
  );

  const b1 = screen.getByRole("button", { name: /matrix$/i });
  const b2 = screen.getByRole("button", { name: /matrix reloaded/i });
  const b3 = screen.getByRole("button", { name: /matrix revolutions/i });

  await user.click(b1);
  expect(onFetch).toHaveBeenCalledWith("Matrix");

  rerender(<ButtonBar onFetch={onFetch} loading={true} />);
  expect(b1).toHaveAttribute("disabled");
});

test("calls onFetch with input text on click and Enter; shows busy when loadingKey is set", async () => {
  const user = userEvent.setup();
  const onFetch = vi.fn();

  const { rerender } = render(<ButtonBar onFetch={onFetch} loading={null} />);

  const input = screen.getByRole("textbox", { name: /search input/i });
  await user.type(input, "Interstellar");
  let searchBtn = screen.getByRole("button", { name: /Search/i });

  await user.click(searchBtn);
  expect(onFetch).toHaveBeenCalledWith("Interstellar");

  await user.clear(input);
  await user.type(input, "Dune{Enter}");
  expect(onFetch).toHaveBeenCalledWith("Dune");

  rerender(<ButtonBar onFetch={onFetch} loading={true} />);

  expect(screen.getByRole("button", { name: /matrix$/i })).toBeDisabled();
});
