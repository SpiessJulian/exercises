import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FirstExercise from "..";

describe("FirstExercise", () => {
	it("should render the header", () => {
		render(<FirstExercise minValue={10} maxValue={50} />);

		expect(screen.getByText("First Exercise")).toBeInTheDocument();
	});

	it("should show min and max values on load", () => {
		render(<FirstExercise minValue={12} maxValue={75} />);

		expect(screen.getByText("$12")).toBeInTheDocument();
		expect(screen.getByText("$75")).toBeInTheDocument();
	});

	it("should change min value dragging and droping the slider", async () => {
		render(<FirstExercise minValue={10} maxValue={50} />);

		const minSlider = screen.getAllByTestId("slider")[0];
		const destination = screen.getByTestId(20);

		fireEvent.dragStart(minSlider);
        fireEvent.dragOver(destination);
        fireEvent.drop(destination);

		await waitFor(() => expect(screen.getByText("$20")));
	});

    it("should change max value dragging and droping the slider", async () => {
		render(<FirstExercise minValue={10} maxValue={50} />);

		const maxSlider = screen.getAllByTestId("slider")[1];
		const destination = screen.getByTestId(30);

		fireEvent.dragStart(maxSlider);
        fireEvent.dragOver(destination);
        fireEvent.drop(destination);

		await waitFor(() => expect(screen.getByText("$30")));
	});

    it('should render an input on min price click', () => {
        render(<FirstExercise minValue={10} maxValue={50} />);

        const minPrice = screen.getByText("$10");

        fireEvent.click(minPrice);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render an input on max price click', () => {
        render(<FirstExercise minValue={10} maxValue={50} />);

        const maxPrice = screen.getByText("$50");

        fireEvent.click(maxPrice);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should load the current min value on manual edition', () => {
        render(<FirstExercise minValue={10} maxValue={50} />);

        const minPrice = screen.getByText("$10");

        fireEvent.click(minPrice);

        expect(screen.getByRole('textbox')).toHaveAttribute('value', '10');
    });

    it('should load the current max value on manual edition', () => {
        render(<FirstExercise minValue={10} maxValue={50} />);

        const maxPrice = screen.getByText("$50");

        fireEvent.click(maxPrice);

        expect(screen.getByRole('textbox')).toHaveAttribute('value', '50');
    });

    it('should change the current min value on manual edition by pressing enter', () => {
        render(<FirstExercise minValue={10} maxValue={50} />);

        const minPrice = screen.getByText("$10");

        fireEvent.click(minPrice);

        const textbox = screen.getByRole('textbox');

        fireEvent.change(textbox, { target: { value: '20' } });

        fireEvent.submit(textbox);

        expect(screen.getByText('$20')).toBeInTheDocument();
    });

    it('should change the current max value on manual edition by pressing enter', () => {
        render(<FirstExercise minValue={10} maxValue={50} />);

        const maxPrice = screen.getByText("$50");

        fireEvent.click(maxPrice);

        const textbox = screen.getByRole('textbox');

        fireEvent.change(textbox, { target: { value: '30' } });

        fireEvent.submit(textbox);

        expect(screen.getByText('$30')).toBeInTheDocument();
    });

    it('should change the current min value on manual edition by clicking the button', () => {
        render(<FirstExercise minValue={10} maxValue={50} />);

        const minPrice = screen.getByText("$10");

        fireEvent.click(minPrice);

        const textbox = screen.getByRole('textbox');

        fireEvent.change(textbox, { target: { value: '20' } });

        fireEvent.click(screen.getByRole('button'));

        expect(screen.getByText('$20')).toBeInTheDocument();
    });

    it('should change the current max value on manual edition by clicking the button', () => {
        render(<FirstExercise minValue={10} maxValue={50} />);

        const maxPrice = screen.getByText("$50");

        fireEvent.click(maxPrice);

        const textbox = screen.getByRole('textbox');

        fireEvent.change(textbox, { target: { value: '30' } });

        fireEvent.click(screen.getByRole('button'));

        expect(screen.getByText('$30')).toBeInTheDocument();
    });    

    it('should return the min slider to the previous position if the new target is out of bounds', async () => {
        render(<FirstExercise minValue={10} maxValue={50} />);

		const minSlider = screen.getAllByTestId("slider")[0];
		const destination = screen.getByText('$50');

		fireEvent.dragStart(minSlider);
        fireEvent.dragOver(destination);
        fireEvent.drop(destination);

		await waitFor(() => expect(screen.getByText("$10")));
    });

    it('should return the max slider to the previous position if the new target is out of bounds', async () => {
        render(<FirstExercise minValue={10} maxValue={50} />);

		const maxSlider = screen.getAllByTestId("slider")[1];
		const destination = screen.getByText('$10');

		fireEvent.dragStart(maxSlider);
        fireEvent.dragOver(destination);
        fireEvent.drop(destination);

		await waitFor(() => expect(screen.getByText("$50")));
    });

    it('should return the min slider to the previous position if the new target is corssing the other slider', async () => {
        render(<FirstExercise minValue={10} maxValue={50} />);

		const minSlider = screen.getAllByTestId("slider")[0];
        const maxSlider = screen.getAllByTestId("slider")[1];
		const firstDestination = screen.getByTestId(30);
        const secondDestination = screen.getByTestId(40);

		fireEvent.dragStart(maxSlider);
        fireEvent.dragOver(firstDestination);
        fireEvent.drop(firstDestination);

        await waitFor(() => expect(screen.getByText("$30")));

        fireEvent.dragStart(minSlider);
        fireEvent.dragOver(secondDestination);
        fireEvent.drop(secondDestination);

		await waitFor(() => expect(screen.getByText("$10")));
    });

    it('should return the max slider to the previous position if the new target is corssing the other slider', async () => {
        render(<FirstExercise minValue={10} maxValue={50} />);

		const minSlider = screen.getAllByTestId("slider")[0];
        const maxSlider = screen.getAllByTestId("slider")[1];
		const firstDestination = screen.getByTestId(30);
        const secondDestination = screen.getByTestId(10);

		fireEvent.dragStart(minSlider);
        fireEvent.dragOver(firstDestination);
        fireEvent.drop(firstDestination);

        await waitFor(() => expect(screen.getByText("$30")));

        fireEvent.dragStart(maxSlider);
        fireEvent.dragOver(secondDestination);
        fireEvent.drop(secondDestination);

		await waitFor(() => expect(screen.getByText("$50")));
    });
});
