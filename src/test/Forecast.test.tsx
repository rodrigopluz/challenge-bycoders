import { RecoilRoot } from "recoil";
import { describe, it, expect } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";

import {
	render,
	screen,
	fireEvent,
} from "@testing-library/react";

import Forecast from "../pages/Forecast";

describe("Forecast", () => {
	it("should render the form correctly", () => {
		render(
			<RecoilRoot>
				<Router>
					<Forecast />
				</Router>
			</RecoilRoot>
		);

		expect(
			screen.getByLabelText("Latitude")
		).toBeInTheDocument();

		expect(
			screen.getByLabelText("Longitude")
		).toBeInTheDocument();

		expect(
			screen.getByRole("button", {
				name: "Obter previsão do tempo",
			})
		).toBeInTheDocument();

		expect(
			screen.getByRole("button", { name: "Cancelar" })
		).toBeInTheDocument();
	});

	it("should display error messages when form is submitted with empty fields", () => {
		render(
			<RecoilRoot>
				<Router>
					<Forecast />
				</Router>
			</RecoilRoot>
		);

		fireEvent.click(
			screen.getByRole("button", {
				name: "Obter previsão do tempo",
			})
		);

		if (screen.queryByText("Cordenada Latitude é obrigatório")) {
			expect(
				screen.getByText("Cordenada Latitude é obrigatório")
			).toBeInTheDocument();
		}

		if (
			screen.queryByText("Cordenada Longitude é obrigatório")
		) {
			expect(
				screen.getByText("Cordenada Longitude é obrigatório")
			).toBeInTheDocument();
		}
	});

	it("should submit the form and navigate to /forecasts", () => {
		render(
			<RecoilRoot>
				<Router>
					<Forecast />
				</Router>
			</RecoilRoot>
		);

		fireEvent.change(screen.getByLabelText("Latitude"), {
			target: { value: "-23.5505" },
		});

		fireEvent.change(screen.getByLabelText("Longitude"), {
			target: { value: "-46.6333" },
		});

		fireEvent.click(
			screen.getByRole("button", {
				name: "Obter previsão do tempo",
			})
		);

		expect(
			screen.queryByText("Cordenada Latitude é obrigatória")
		).toBeNull();

		expect(
			screen.queryByText("Cordenada Longitude é obrigatória")
		).toBeNull();

		expect(
			screen.getByRole("button", { name: "Cancelar" })
		).toBeInTheDocument();
	});
});
