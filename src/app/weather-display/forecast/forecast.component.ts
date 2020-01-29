import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/shared/weather.service';
import { Forecast } from 'src/app/shared/forecast.model';
import { Weather } from 'src/app/shared/weather.model';
import { LocationService } from 'src/app/shared/location.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  forecasts: Forecast[];

  constructor(private weatherService: WeatherService, private locationService: LocationService) { }

  ngOnInit() {
    this.weatherService.weatherData$.subscribe(
      (weather: Weather) => {
        if (weather) {
          this.forecasts = weather.daily.data.slice(1, 8);
        }
      }
    );

    this.locationService.locationChange$.subscribe(
      () => {
        this.forecasts = null;
      }
    );
  }
}
