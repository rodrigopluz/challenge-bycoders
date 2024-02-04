interface CardProps {
	longitude?: string;
	latitude?: string;
	data: {
		latitude: string;
		longitude: string;
		current: {
			is_day: number;
			rain: number;
			apparent_temperature: string;
			temperature_2m: string;
			relative_humidity_2m: number;
			wind_direction_10m: number;
			wind_gusts_10m: string;
			wind_speed_10m: string;
		};
		current_units: {
			is_day: string;
			rain: string;
			apparent_temperature: string;
			temperature_2m: string;
			relative_humidity_2m: string;
			wind_direction_10m: string;
			wind_gusts_10m: string;
			wind_speed_10m: string;
		};
	};
}

export default CardProps;
