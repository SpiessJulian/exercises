import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import * as api from '../utils/api.js';
import App from '../App.jsx';

api.getMinMaxValues = jest.fn(() => ({ min: 20, max: 50 }));
api.getFixedValues = jest.fn(() => [10, 20, 40, 60]);


describe('App', () => {
    it('should call both APIs on component load', async () => {
        render(<App/>);

        await waitFor(() => expect(api.getMinMaxValues).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(api.getFixedValues).toHaveBeenCalledTimes(1));
    });

    it('should show a loading message while loading for the APIs responses', async () => {
        render(<App/>);

        await waitFor(() => expect(screen.getByText('Loading...')).toBeInTheDocument());
    });
});
