import React from "react";

import Box from "@mui/material/Box";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import CardProps from "../../helpers/types/Cards";
import { getWeatherData } from "../../api/getService";

const Cards: React.FC<CardProps> = ({ data }) => {
	const handleReload = async (
		latitude: string,
		longitude: string
	) => {
		const data = await getWeatherData(latitude, longitude);

		const dataStorage = JSON.parse(
			localStorage.getItem("weatherData") as string
		).filter(
			(item: CardProps) =>
				item.latitude !== data.latitude &&
				item.longitude !== data.longitude
		);

		dataStorage.push(data);

		localStorage.setItem(
			"weatherData",
			JSON.stringify(dataStorage)
		);

		window.location.reload();
	};

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
					<Typography component="h3" variant="h6">
						Localização:
					</Typography>
					<Box display="flex" justifyContent="space-between">
						<Typography component="p">
							Latitude: {data.latitude}
						</Typography>
						<Typography component="p">
							Longitude: {data.longitude}
						</Typography>
					</Box>
				</Box>
				<Divider sx={{ marginY: 2 }} />
				<Box>
					<Typography
						component="h3"
						variant="h6"
						display="flex"
						justifyContent="space-between"
						title={data.current.is_day == 1 ? "Dia" : "Noite"}
					>
						Condição do Tempo
						{data.current.is_day == 1 ? (
							<Brightness5Icon />
						) : (
							<BedtimeIcon />
						)}
					</Typography>
					<Typography component="p">
						Temperatura: {data.current.temperature_2m}{" "}
						{data.current_units.temperature_2m}
					</Typography>
					<Typography component="p">
						Umidade relativa: {data.current.relative_humidity_2m}{" "}
						{""}
						{data.current_units.relative_humidity_2m}
					</Typography>
					<Typography
						component="p"
						display="flex"
						alignItems="center"
						justifyContent="space-between"
					>
						Velocidade do vento: {data.current.wind_speed_10m}{" "}
						{""}
						{data.current_units.wind_speed_10m}
						<Button
							size="large"
							component="a"
							color="primary"
							onClick={() =>
								handleReload(data.latitude, data.longitude)
							}
							sx={{ borderRadius: "5px", marginTop: "10px" }}
						>
							Recarregar
						</Button>
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default Cards;
