import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import { Auth } from "../pages";

beforeEach(() => {
  render(
    <Router>
      <Auth />
    </Router>
  );
});

test("email field allows input", () => {
  const inputEl = screen.getByTestId("email");
  userEvent.type(inputEl, "test@mail.com");
  expect(screen.getByTestId("email")).toHaveValue("test@mail.com");
});

test("login fails when submitting form without any values", () => {
  const submitButton = screen.getByRole("button", {
    name: /Login/i,
  });
  userEvent.click(submitButton);

  expect(
    screen.getByRole("heading", {
      name: /Login/i,
    })
  ).toBeInTheDocument();
});

test("clicking Create new account button, title switches to Register", () => {
  const registerSwitch = screen.getByRole("button", {
    name: /Create new account/i,
  });
  userEvent.click(registerSwitch);
  expect(screen.getByText("Register")).toBeInTheDocument();
  expect(screen.getByText("Create Account")).toBeInTheDocument();
});

test("clicking Login with existing account button, Login view renders", () => {
  const registerSwitch = screen.getByRole("button", {
    name: /Create new account/i,
  });

  // Beacuse the component hasn't been configured to have a deep link that
  // goes directly to the Register we need to manually navigate to the
  // register view first in order to test coming back
  userEvent.click(registerSwitch);
  const loginSwitch = screen.getByRole("button", {
    name: /Login with existing account/i,
  });
  userEvent.click(loginSwitch);
  expect(
    screen.getByRole("heading", {
      name: /Login/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: /Login/i,
    })
  ).toBeInTheDocument();
});

test("logs in with valid values", () => {
  const inputEmail = screen.getByTestId("email");
  const inputPass = screen.getByTestId("password");
  const submitButton = screen.getByRole("button", {
    name: /Login/i,
  });

  userEvent.type(inputEmail, "valid@example.com");
  userEvent.type(inputPass, "password");
  userEvent.click(submitButton);

  // After succesful login, user is redirected
  expect(global.window.location.href).toContain("/");
});

test("does not login with invalid values for email", () => {
  const inputEmail = screen.getByTestId("email");
  const inputPass = screen.getByTestId("password");
  const submitButton = screen.getByRole("button", {
    name: /Login/i,
  });

  userEvent.type(inputEmail, "notvalid@example.com");
  userEvent.type(inputPass, "password");
  userEvent.click(submitButton);

  // After succesful login, user is redirected
  expect(
    screen.getByRole("button", {
      name: /Login/i,
    })
  ).toBeInTheDocument();
});

test("does not login with invalid values for password", () => {
  const inputEmail = screen.getByTestId("email");
  const inputPass = screen.getByTestId("password");
  const submitButton = screen.getByRole("button", {
    name: /Login/i,
  });

  userEvent.type(inputEmail, "valid@example.com");
  userEvent.type(inputPass, "wrongpassword");
  userEvent.click(submitButton);

  // Still on login page
  expect(
    screen.getByRole("button", {
      name: /Login/i,
    })
  ).toBeInTheDocument();
});

test("does not login with blank values for email and password", () => {
  const submitButton = screen.getByRole("button", {
    name: /Login/i,
  });

  userEvent.click(submitButton);

  // Still on login page
  expect(
    screen.getByRole("button", {
      name: /Login/i,
    })
  ).toBeInTheDocument();
});

test("registration is possible with fresh email", () => {
  const registerSwitch = screen.getByRole("button", {
    name: /Create new account/i,
  });
  userEvent.click(registerSwitch);

  const inputEmail = screen.getByTestId("email");
  const inputPass = screen.getByTestId("password");
  const submitButton = screen.getByRole("button", {
    name: /Create Account/i,
  });

  const randomNumber = Math.floor(Math.random() * 10000000 + 1);
  // make a random email so this truly tests with a new email each time
  userEvent.type(inputEmail, `newemail${randomNumber}@example.com`);
  userEvent.type(inputPass, "password");
  userEvent.click(submitButton);

  // After succesful registration, user is redirected also
  expect(global.window.location.href).toContain("/");
});

test("registration is not possible with duplicate account", () => {
  const registerSwitch = screen.getByRole("button", {
    name: /Create new account/i,
  });
  userEvent.click(registerSwitch);

  const inputEmail = screen.getByTestId("email");
  const inputPass = screen.getByTestId("password");
  const submitButton = screen.getByRole("button", {
    name: /Create Account/i,
  });

  userEvent.type(inputEmail, "newemail2@example.com");
  userEvent.type(inputPass, "password");
  userEvent.click(submitButton);

  // After succesful registration, user is redirected also
  expect(
    screen.getByRole("button", {
      name: /Login/i,
    })
  ).toBeInTheDocument();
});

test("registration is not possible with no email entered", () => {
  const registerSwitch = screen.getByRole("button", {
    name: /Create new account/i,
  });
  userEvent.click(registerSwitch);

  const inputPass = screen.getByTestId("password");
  const submitButton = screen.getByRole("button", {
    name: /Create Account/i,
  });

  // Note, not filling anything in the email field
  userEvent.type(inputPass, "password");

  userEvent.click(submitButton);

  // After succesful registration, user is redirected also
  expect(
    screen.getByRole("button", {
      name: /Login/i,
    })
  ).toBeInTheDocument();
});

test("registration fails with no password", () => {
  const registerSwitch = screen.getByRole("button", {
    name: /Create new account/i,
  });
  userEvent.click(registerSwitch);

  const inputEmail = screen.getByTestId("email");
  const submitButton = screen.getByRole("button", {
    name: /Create Account/i,
  });

  userEvent.type(inputEmail, "newemail2@example.com");
  // Note, not filling anything in the password field
  userEvent.click(submitButton);

  // After succesful registration, user is redirected also
  expect(
    screen.getByRole("button", {
      name: /Login/i,
    })
  ).toBeInTheDocument();
});

test("registration fails with no email and no password", () => {
  const registerSwitch = screen.getByRole("button", {
    name: /Create new account/i,
  });
  userEvent.click(registerSwitch);

  const submitButton = screen.getByRole("button", {
    name: /Create Account/i,
  });

  // Note, not filling anything in the email field
  // Note, not filling anything in the password field
  userEvent.click(submitButton);

  // After succesful registration, user is redirected also
  expect(
    screen.getByRole("button", {
      name: /Login/i,
    })
  ).toBeInTheDocument();
});
