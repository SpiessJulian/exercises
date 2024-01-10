import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Slider from '..';

describe('Slider', () => {
    it('should call the onDragStart function with the received name on dragging', () => {
        const mockedDragStart = jest.fn();
        const mockedName = 'testSlider';

        render(<Slider onDragStart={mockedDragStart} name={mockedName}/>);
        const slider = screen.getByTestId("slider");

        fireEvent.dragStart(slider);

        expect(mockedDragStart).toHaveBeenCalledWith(mockedName);
    });
});
