import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/shared/weather.service';
import { Forecast } from 'src/app/shared/forecast.model';
import { weatherIconObj } from 'src/app/shared/weatherIconObj';

@Component({
  selector: 'app-forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrls: ['./forecast-item.component.css']
})
export class ForecastItemComponent implements OnInit {
  @Input() forecast: Forecast;
  lowTemp: string;
  highTemp: string;
  wind: string;
  time: Date;
  icon = '/assets/weather-icons/clear-day.png';

  constructor() { }

  ngOnInit() {
    this.lowTemp = Number(this.forecast.temperatureLow).toFixed(0);
    this.highTemp = Number(this.forecast.temperatureHigh).toFixed(0);
    this.wind = Number(this.forecast.windSpeed).toFixed(0);
    this.icon = weatherIconObj[this.forecast.icon];
    this.time = new Date(Number(this.forecast.time) * 1000);
  }

}
