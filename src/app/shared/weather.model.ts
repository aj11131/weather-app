import { Forecast } from './forecast.model';

export interface Weather {
  currently: {
    temperature: string,
    apparentTemperature: string,
    precipProbability: string,
    humidity: string,
    summary: string,
    time: string
    windSpeed: string;
    windBearing: string;
    visibility: string;
    uvIndex: string;
    cloudCover: string;
    pressure: string;
    icon: string;
  };
  daily: {
    data: Forecast[]
  };
}
