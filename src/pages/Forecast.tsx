import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { getWeatherData } from "../api/getService";
import { weatherDataState } from "../atoms/weatherState";

import MaskedInput from "../componets/MaskedInput/MaskedInput";
import Masks from "../helpers/constants/Masks";

interface WeatherData {
	latitude: string;
	longitude: string;
}

const formValidation = yup.object().shape({
	latitude: yup
		.string()
		.required("Cordenada Latitude é obrigatório"),
	longitude: yup
		.string()
		.required("Cordenada Longitude é obrigatório"),
});

const Forecast: React.FC = () => {
	const [latitude] = useState("");
	const [longitude] = useState("");

	const navigate = useNavigate();

	const [weatherData, setWeatherData] =
		useRecoilState(weatherDataState);

	const {
		reset,
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			latitude: "",
			longitude: "",
		},
		resolver: yupResolver(formValidation),
	});

	useEffect(() => {
		reset({
			latitude: latitude,
			longitude: longitude,
		});

		const savedData = localStorage.getItem("weatherData");
		if (savedData) {
			setWeatherData(JSON.parse(savedData));
		}
	}, [latitude, longitude, reset, setWeatherData]);

	const onSubmit = async (event: WeatherData) => {
		const { latitude, longitude } = event;
		try {
			const data = await getWeatherData(latitude, longitude);

			setWeatherData((prev) => [...prev, data]);
			localStorage.setItem(
				"weatherData",
				JSON.stringify([...weatherData, data])
			);
		} catch (error) {
			console.error(error);
		}

		navigate("/forecasts");
	};

	return (
		<Box display="flex" flexWrap="wrap">
			<Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
				<Typography component="h2" variant="body2">
					Adiciona as coordenadas para obter a previsão do tempo
				</Typography>
				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					<Box gap={2} display="flex">
						<Controller
							name="latitude"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									fullWidth
									margin="dense"
									label="Latitude"
									variant="outlined"
									autoComplete="off"
									error={Boolean(errors.latitude)}
									helperText={
										errors.latitude && errors.latitude.message
									}
									{...register("latitude", { required: true })}
									InputProps={{
										inputComponent: MaskedInput,
										inputProps: {
											inputMode: "numeric",
											mask: Masks.COORDENATE,
											unmask: true,
										},
									}}
								/>
							)}
						/>

						<Controller
							name="longitude"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									fullWidth
									margin="dense"
									label="Longitude"
									variant="outlined"
									autoComplete="off"
									error={Boolean(errors.longitude)}
									helperText={
										errors.longitude && errors.longitude.message
									}
									{...register("longitude", { required: true })}
									InputProps={{
										inputComponent: MaskedInput,
										inputProps: {
											inputMode: "numeric",
											mask: Masks.COORDENATE,
											unmask: true,
										},
									}}
								/>
							)}
						/>
					</Box>
					<Box gap={2} display="flex">
						<Button
							size="large"
							type="submit"
							color="primary"
							variant="contained"
							sx={{ borderRadius: "5px", marginTop: "10px" }}
						>
							Obter previsão do tempo
						</Button>
						<Button
							size="large"
							color="secondary"
							variant="contained"
							onClick={() => navigate("/forecasts")}
							sx={{ borderRadius: "5px", marginTop: "10px" }}
						>
							Cancelar
						</Button>
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};

export default Forecast;
