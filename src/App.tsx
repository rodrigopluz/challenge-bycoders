import React from "react";
import { RecoilRoot } from "recoil";

import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import Container from "@mui/material/Container";

import Forecast from "./pages/Forecast";
import Forecasts from "./pages/Forecasts";

const App: React.FC = () => {
	return (
		<RecoilRoot>
			<Container>
				<Router>
					<Routes>
						<Route path="/" element={<Forecasts />} />
						<Route path="/forecasts" element={<Forecasts />} />
						<Route path="/add-forecast" element={<Forecast />} />
					</Routes>
				</Router>
			</Container>
		</RecoilRoot>
	);
};

export default App;
