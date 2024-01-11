import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "..";


describe("Navbar", () => {
	it("should render the link to the first exercise", () => {
		render(<Navbar />);

		expect(screen.getByText("Exercise 1")).toBeInTheDocument();
	});

	it("should render the link to the second exercise", () => {
		render(<Navbar />);

		expect(screen.getByText("Exercise 2")).toBeInTheDocument();
	});

	it('should navigate to Exercise 1 route on link click', () => {
		render(<Navbar />);

		expect(screen.getByText('Exercise 1').href).toBe('http://localhost/');
	});

	it('should navigate to Exercise 2 route on link click', () => {
		render(<Navbar />);

		expect(screen.getByText('Exercise 2').href).toBe('http://localhost/exercise2');
	});
});
