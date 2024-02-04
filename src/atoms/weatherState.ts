import { atom } from "recoil";

export const weatherDataState = atom({
	key: "weatherDataState",
	default: [
		{
			latitude: "",
			longitude: "",
			timezone: "",
			timezone_abbreviation: "",
			elevation: "",
			current: {
				temperature_2m: "",
			},
			current_units: {
				temperature_2m: "",
			},
			hourly_units: {
				temperature_2m: "",
				relative_humidity_2m: "",
				rain: "",
				weather_code: "",
				pressure_msl: "",
			},
			hourly: [
				{
					temperature_2m: "",
					relative_humidity_2m: "",
					rain: "",
					weather_code: "",
					pressure_msl: "",
				},
			],
			description: "",
		},
	],
});
