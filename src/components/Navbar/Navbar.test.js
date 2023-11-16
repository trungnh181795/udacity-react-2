/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { setAuthedUser } from "../../redux/actions/auth-actions";
import { store } from "../../redux/store";
import Navbar from './Navbar';

describe("Navbar", () => {
    it("should render the view", () => {
        store.dispatch(setAuthedUser({ id: "sarahedo", password: "" }));
        const view = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );
        expect(view).toBeDefined();
        expect(view).toMatchSnapshot();
    });

    it("should display username of logged-in user", () => {
        store.dispatch(setAuthedUser({ id: "sarahedo", password: "password123" }));

        const view = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );

        const userSpanElement = view.getByTestId("user-information");
        expect(userSpanElement.textContent).toBe("User: sarahedo");

    });
});