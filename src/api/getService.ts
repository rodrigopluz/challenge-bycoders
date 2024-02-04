import axios from "axios";

const baseURL = "https://api.open-meteo.com/v1/forecast";

export const getWeatherData = async (
	latitude: string | number,
	longitude: string | number
) => {
	try {
		const response = await axios.get(
			`${baseURL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=America%2FSao_Paulo`
		);
		return response.data;
	} catch (error) {
		throw new Error("Erro ao obter dados meteorológicos.");
	}
};
