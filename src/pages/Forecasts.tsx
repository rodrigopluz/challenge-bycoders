import React from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import Cards from "../componets/Cards/Cards";
import CardProps from "../helpers/types/Cards";

import { weatherDataState } from "../atoms/weatherState";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Forecasts: React.FC = () => {
	const navigate = useNavigate();
	const weatherData = useRecoilValue(weatherDataState);

	const storage = localStorage.getItem("weatherData");
	const data = JSON.parse(storage as string);

	return (
		<Box display="flex" gap={3} flexDirection="column">
			<Typography component="h1" variant="h4">
				Aplicação de Previsão do Tempo
			</Typography>
			{localStorage.getItem("weatherData") === null
				? weatherData.map((data) => {
						if (data.latitude !== "" && data.longitude !== "") {
							return <Cards data={data as never} />;
						} else {
							return (
								<Card variant="elevation">
									<CardContent
										sx={{
											display: "flex",
											alignItems: "stretch",
											flexDirection: "column",
											justifyContent: "space-between",
										}}
									>
										<Box>
											<Typography component="p">
												Nenhuma previsão do tempo foi adicionada.
											</Typography>
										</Box>
									</CardContent>
								</Card>
							);
						}
				  })
				: data.map((row: CardProps, key: number) => {
						if (row.latitude !== "" && row.longitude !== "") {
							return (
								<Box key={key}>
									<Cards data={row as never} />
								</Box>
							);
						}
				  })}
			<Button
				size="large"
				component="a"
				color="primary"
				variant="contained"
				onClick={() => navigate("/add-forecast")}
				sx={{ borderRadius: "5px", marginTop: "10px" }}
			>
				Adicionar previsão do tempo
			</Button>
		</Box>
	);
};

export default Forecasts;
