import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("app tests", () => {
  test("renders main page", () => {
    render(<App />);
    expect(screen.getByRole("heading")).toHaveTextContent("Welcome to");
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("Login/Register button navigates to auth", () => {
    render(<App />);
    userEvent.click(screen.getByText("Login/Register"));
    expect(global.window.location.href).toContain("/auth");
  });
});
