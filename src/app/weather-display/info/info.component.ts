import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/shared/weather.model';
import { WeatherService } from 'src/app/shared/weather.service';
import { bearingToDirection } from './bearingToDirection';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  precipProbability: string;
  humidity: string;
  windSpeed: string;
  windBearing: string;
  windDirection: string;
  visibility: string;
  uvIndex: string;
  cloudCover: string;
  pressure: string;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.weatherData$.subscribe(
      (weather: Weather) => {
        if (weather) {
          this.precipProbability = (Number(weather.currently.precipProbability) * 100).toFixed(0).toString() + '%';
          this.humidity = (Number(weather.currently.humidity) * 100).toFixed(0).toString() + '%';
          this.windSpeed = Math.round(Number(weather.currently.windSpeed)).toString() + ' mph';
          this.windBearing = weather.currently.windBearing;
          this.windDirection = bearingToDirection(Number(this.windBearing));
          this.visibility = (Number(weather.currently.visibility).toFixed(1)).toString() + ' miles';
          this.uvIndex = weather.currently.uvIndex;
          this.cloudCover = (Number(weather.currently.cloudCover) * 100).toFixed(0).toString() + '%';
          this.pressure = (Number(weather.currently.pressure) / 33.864).toFixed(2).toString() + ' in.';
        }
      }
    );
  }

}
