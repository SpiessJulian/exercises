import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SecondExercise from '..';


describe('SecondExercise', () => {
    it('should render the header', () => {
        render(<SecondExercise availableValues={[10, 20, 30, 40]}/>);
    
        expect(screen.getByText('Second Exercise')).toBeInTheDocument()
    });
    
    it('should show min and max values as initial values on load', () => {
        render(<SecondExercise availableValues={[10, 20, 30, 40]}/>);

        expect(screen.getByText('$10')).toBeInTheDocument();
        expect(screen.getByText('$40')).toBeInTheDocument();
    });

    it("should change min value dragging and droping the slider", async () => {
		render(<SecondExercise availableValues={[10, 20, 30, 40]}/>);

		const minSlider = screen.getAllByTestId("slider")[0];
		const destination = screen.getByTestId(20);

		fireEvent.dragStart(minSlider);
        fireEvent.dragOver(destination);
        fireEvent.drop(destination);

		await waitFor(() => expect(screen.getByText("$20")));
	});

    it("should change max value dragging and droping the slider", async () => {
		render(<SecondExercise availableValues={[10, 20, 30, 40]}/>);

		const minSlider = screen.getAllByTestId("slider")[1];
		const destination = screen.getByTestId(30);

		fireEvent.dragStart(minSlider);
        fireEvent.dragOver(destination);
        fireEvent.drop(destination);

		await waitFor(() => expect(screen.getByText("$30")));
	});

    it('should render an input on min price click', () => {
        render(<SecondExercise availableValues={[10, 20, 30, 40]}/>);

        const minPrice = screen.getByText("$10");

        fireEvent.click(minPrice);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render an input on max price click', () => {
        render(<SecondExercise availableValues={[10, 20, 30, 40]}/>);

        const maxPrice = screen.getByText("$40");

        fireEvent.click(maxPrice);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should load the current min value on manual edition', () => {
        render(<SecondExercise availableValues={[10, 20, 30, 40]}/>);

        const minPrice = screen.getByText("$10");

        fireEvent.click(minPrice);

        expect(screen.getByRole('textbox')).toHaveAttribute('value', '10');
    });

    it('should load the current max value on manual edition', () => {
        render(<SecondExercise availableValues={[10, 20, 30, 40]}/>);

        const maxPrice = screen.getByText("$40");

        fireEvent.click(maxPrice);

        expect(screen.getByRole('textbox')).toHaveAttribute('value', '40');
    });

    it('should change the current min value on manual edition', () => {
        render(<SecondExercise availableValues={[10, 20, 30, 40]}/>);

        const minPrice = screen.getByText("$10");

        fireEvent.click(minPrice);

        const textbox = screen.getByRole('textbox');

        fireEvent.change(textbox, { target: { value: '20' } });

        fireEvent.submit(textbox);

        expect(screen.getByText('$20')).toBeInTheDocument();
    });

    it('should change the current max value on manual edition', () => {
        render(<SecondExercise availableValues={[10, 20, 30, 40]}/>);

        const maxPrice = screen.getByText("$40");

        fireEvent.click(maxPrice);

        const textbox = screen.getByRole('textbox');

        fireEvent.change(textbox, { target: { value: '30' } });

        fireEvent.submit(textbox);

        expect(screen.getByText('$30')).toBeInTheDocument();
    });

    it('should return the min slider to the previous position if the new target is out of bounds', async () => {
        render(<SecondExercise availableValues={[10, 20, 30, 40]}/>);

		const minSlider = screen.getAllByTestId("slider")[0];
		const destination = screen.getByText('$40');

		fireEvent.dragStart(minSlider);
        fireEvent.dragOver(destination);
        fireEvent.drop(destination);

		await waitFor(() => expect(screen.getByText("$10")));
    });

    it('should return the max slider to the previous position if the new target is out of bounds', async () => {
        render(<SecondExercise availableValues={[10, 20, 30, 40]}/>);

		const maxSlider = screen.getAllByTestId("slider")[1];
		const destination = screen.getByText('$10');

		fireEvent.dragStart(maxSlider);
        fireEvent.dragOver(destination);
        fireEvent.drop(destination);

		await waitFor(() => expect(screen.getByText("$40")));
    });

    it('should return the min slider to the previous position if the new target is corssing the other slider', async () => {
        render(<SecondExercise availableValues={[10, 20, 30, 40]}/>);

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
        render(<SecondExercise availableValues={[10, 20, 30, 40]}/>);

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

		await waitFor(() => expect(screen.getByText("$40")));
    });
});
