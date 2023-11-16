/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import CreatePoll from "./CreatePoll";
import { store } from "../../redux/store";

describe("CreatePoll", () => {
    it("should render the page", () => {
        const view = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CreatePoll />
                </BrowserRouter>
            </Provider>
        );
        expect(view).toBeDefined();
        expect(view).toMatchSnapshot();
    });

    it("should display all elements", () => {
        const view = render(
            <Provider store={store}>
                <BrowserRouter>
                    <CreatePoll />
                </BrowserRouter>
            </Provider>
        );

        const firstOptionLabelElement = view.getByTestId("firstOptionLabel");
        const firstOptionInputElement = view.getByTestId("firstOptionInput");
        const secondOptionLabelElement = view.getByTestId("secondOptionLabel");
        const secondOptionInputElement = view.getByTestId("secondOptionInput");
        const submitButtonElement = view.getByTestId("submit-button");

        expect(firstOptionLabelElement.textContent).toBe("First Option");
        expect(secondOptionLabelElement.textContent).toBe("Second Option");
        expect(submitButtonElement.textContent).toBe("Submit");

        fireEvent.change(firstOptionInputElement, { target: { value: 'Hanoi' } });
        fireEvent.change(secondOptionInputElement, { target: { value: 'HCMC' } });
        expect(firstOptionInputElement.value).toBe("Hanoi");
        expect(secondOptionInputElement.value).toBe("HCMC");
    });
});