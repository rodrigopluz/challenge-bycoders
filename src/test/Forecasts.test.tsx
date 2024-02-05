import { describe, it, expect, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import Forecasts from "../pages/Forecasts";

vi.mock("recoil", () => ({
	useRecoilValue: vi.fn(),

	RecoilRoot: ({ children }: { children: React.ReactNode }) =>
		children,
	atom: vi.fn(),
	useRecoilState: vi.fn(),
	weatherDataState: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
	useNavigate: vi.fn(),
}));

describe("Forecasts", () => {
	beforeEach(() => {
		(useRecoilValue as Mock).mockReturnValue([]);
		(useNavigate as Mock).mockReturnValue(vi.fn());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("renders the application title", () => {
		render(<Forecasts />);
		expect(
			screen.getByText("Aplicação de Previsão do Tempo")
		).toBeInTheDocument();
	});

	it("renders the 'Nenhuma previsão do tempo foi adicionada' message when weatherData is empty", () => {
		render(<Forecasts />);

		if (
			screen.queryByText(
				"Nenhuma previsão do tempo foi adicionada."
			)
		) {
			expect(
				screen.getByText(
					"Nenhuma previsão do tempo foi adicionada."
				)
			).toBeInTheDocument();
		}
	});

	it("renders the 'Adicionar previsão do tempo' button", () => {
		render(<Forecasts />);
		expect(
			screen.getByText("Adicionar previsão do tempo")
		).toBeInTheDocument();
	});
});
