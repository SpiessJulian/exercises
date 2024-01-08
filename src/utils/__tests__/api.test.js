import { getMinMaxValues, getFixedValues } from "../api";

describe("API", () => {
	beforeEach(() => {
		fetch.mockClear();
	});

	describe("getMinMaxValues", () => {
        const mockedFirstResponse = { min: 10, max: 20 };

		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(mockedFirstResponse),
			})
		);

		it("should call fetch with the corresponding URL", async () => {
			await getMinMaxValues();

			expect(fetch).toHaveBeenCalledTimes(1);
			expect(fetch).toHaveBeenCalledWith(
				"http://demo6691984.mockable.io/min-max"
			);
		});

		it("should return the data from the API call", async () => {
			const res = await getMinMaxValues();

			expect(res).toStrictEqual(mockedFirstResponse);
		});
	});

    describe("getFixedValues", () => {
        const mockedSecondResponse = [10, 15, 40, 75];


		it("should call fetch with the corresponding URL", async () => {
            const mockedFetch = jest.fn()
                .mockReturnValueOnce(Promise.resolve({
                    json: () => Promise.resolve(mockedSecondResponse),
                }));

            global.fetch = mockedFetch;

			await getFixedValues();

			expect(fetch).toHaveBeenCalledTimes(1);
			expect(fetch).toHaveBeenCalledWith(
				"http://demo6691984.mockable.io/fixed"
			);
		});

		it("should return the data from the API call", async () => {
            const mockedFetch = jest.fn()
                .mockReturnValueOnce(Promise.resolve({
                    json: () => Promise.resolve(mockedSecondResponse),
                }));

            global.fetch = mockedFetch;

			const res = await getFixedValues();

			expect(res).toStrictEqual(mockedSecondResponse);
		});
	});
});
