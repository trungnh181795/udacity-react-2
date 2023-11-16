/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from './redux/store';
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { setAuthedUser } from "./redux/actions/auth-actions";

describe("App", () => {
  it("should render the view", () => {
    const view = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    expect(view).toBeDefined();
    expect(view).toMatchSnapshot();
  });

  it("should show Login page when not logged in", () => {
    const view = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    const heading = view.getByTestId("login-header");
    expect(heading).toBeInTheDocument();
  });

  it("should show Dashboard page if user is logged in", () => {
    store.dispatch(setAuthedUser({ id: "sarahedo", password: "password123" }));

    const view = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    const heading = view.getByTestId("dashboard-header");
    expect(heading).toBeInTheDocument();
  });
});