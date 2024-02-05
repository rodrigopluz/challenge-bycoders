import { describe, it, expect, vi, Mock } from "vitest";
import { useNavigate } from "react-router-dom";

import {
	render,
	screen,
	fireEvent,
} from "@testing-library/react";

import Cards from "../componets/Cards/Cards";
import { getWeatherData } from "../api/getService";

vi.mock("../api/getService", () => ({
	getWeatherData: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
	useNavigate: vi.fn(),
}));

const oldLocation = window.location;

describe("Cards", () => {
	beforeEach(() => {
		(useNavigate as Mock).mockReturnValue(vi.fn());
		localStorage.setItem("weatherData", JSON.stringify([]));
	});

	afterEach(() => {
		window.location = oldLocation;
		vi.clearAllMocks();
		localStorage.clear();
	});

	it("renders Cards component with correct data", () => {
		const mockData = {
			latitude: "123",
			longitude: "456",
			timezone: "America/Sao_Paulo",
			current: {
				is_day: 1,
				rain: 0,
				apparent_temperature: "25",
				temperature_2m: "25",
				relative_humidity_2m: 0,
				wind_direction_10m: 0,
				wind_gusts_10m: "0",
				wind_speed_10m: "0",
			},
			current_units: {
				is_day: "boolean",
				rain: "mm",
				apparent_temperature: "°C",
				temperature_2m: "°C",
				relative_humidity_2m: "%",
				wind_direction_10m: "°",
				wind_gusts_10m: "km/h",
				wind_speed_10m: "km/h",
			},
		};

		render(<Cards data={mockData} />);

		expect(
			screen.getByText("Latitude: 123")
		).toBeInTheDocument();
		expect(
			screen.getByText("Longitude: 456")
		).toBeInTheDocument();
		expect(
			screen.getByText("Temperatura: 25 °C")
		).toBeInTheDocument();
	});

	it("handles reload correctly", async () => {
		delete (window as any).location;
		window.location = {
			...oldLocation,
			reload: vi.fn(),
		};

		const mockData = {
			latitude: "123",
			longitude: "456",
			timezone: "America/Sao_Paulo",
			current: {
				is_day: 1,
				rain: 0,
				apparent_temperature: "25",
				temperature_2m: "25",
				relative_humidity_2m: 0,
				wind_direction_10m: 0,
				wind_gusts_10m: "0",
				wind_speed_10m: "0",
			},
			current_units: {
				is_day: "boolean",
				rain: "mm",
				apparent_temperature: "°C",
				temperature_2m: "°C",
				relative_humidity_2m: "%",
				wind_direction_10m: "°",
				wind_gusts_10m: "km/h",
				wind_speed_10m: "km/h",
			},
		};

		(getWeatherData as Mock).mockResolvedValue(mockData);

		render(<Cards data={mockData} />);

		const reloadButton = screen.getByText("Recarregar");
		fireEvent.click(reloadButton);

		expect(getWeatherData).toHaveBeenCalledTimes(1);
		expect(getWeatherData).toHaveBeenCalledWith("123", "456");

		await screen.findByText("Temperatura: 25 °C");

		expect(localStorage.getItem("weatherData")).toEqual(
			JSON.stringify([mockData])
		);

		expect(useNavigate).toHaveBeenCalledTimes(0);
		expect(window.location.hash).toEqual("");
	});
});
