import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocationService } from '../../shared/location.service';
import { WeatherService } from '../../shared/weather.service';
import { Weather } from 'src/app/shared/weather.model';
import { weatherIconObj } from 'src/app/shared/weatherIconObj';
import { StorableLocation } from 'src/app/shared/storable-location.model';
import { GoogleReverseGeocode } from 'src/app/shared/google-reverse-geocode';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  @ViewChild('loader', {static: true}) loader: ElementRef;
  @ViewChild('iconRef', {static: true}) iconRef: ElementRef;
  currentLocation = '';
  currentTemp: string;
  lowTemp: string;
  highTemp: string;
  feelsLikeTemp: string;
  summary: string;
  icon = '/assets/weather-icons/clear-day.png';
  time: Date;

  constructor(private locationService: LocationService, private weatherService: WeatherService) { }

  ngOnInit() {
    this.iconRef.nativeElement.style.display = 'none';
    this.loader.nativeElement.style.display = 'block';
    this.weatherService.weatherData$.subscribe(
      (weather: Weather) => {
        if (weather) {
          this.currentTemp = Math.round(Number(weather.currently.temperature)).toString();
          this.feelsLikeTemp = Math.round(Number(weather.currently.apparentTemperature)).toString();
          this.lowTemp = Math.round(Number(weather.daily.data[0].temperatureLow)).toString();
          this.highTemp = Math.round(Number(weather.daily.data[0].temperatureHigh)).toString();
          this.icon = weatherIconObj[weather.currently.icon];
          this.loader.nativeElement.style.display = 'none';
          this.iconRef.nativeElement.style.display = 'block';
          this.time = new Date(Number(weather.currently.time) * 1000);
        }
      }
    );

    this.locationService.positionData$.subscribe(
      (location: GoogleReverseGeocode) => {

        if (location) {
        const storableLocation: StorableLocation = {city: '', state: '', country: ''};

        // tslint:disable-next-line: prefer-for-of
        for (let ac = 0; ac < location.results[0].address_components.length; ac++) {
          const component = location.results[0].address_components[ac];
          if (component.types.includes('sublocality') || component.types.includes('locality') || component.types.includes('postal_town')) {
                storableLocation.city = component.long_name;
          } else if (component.types.includes('administrative_area_level_1')) {
                storableLocation.state = component.short_name;
          } else if (component.types.includes('country')) {
                storableLocation.country = component.long_name;
          }
        }

        if (storableLocation.city && storableLocation.state) {
          this.currentLocation = storableLocation.city + ', ' + storableLocation.state;
        } else if (storableLocation.city && storableLocation.country) {
          this.currentLocation = storableLocation.city + ', ' + storableLocation.country;
        } else {
          this.currentLocation = '';
        }
      }
    });
    this.locationService.getWeatherandLocation();

    this.locationService.locationChange$.subscribe(
      () => {
        this.iconRef.nativeElement.style.display = 'none';
        this.loader.nativeElement.style.display = 'block';
        this.currentTemp = '';
        this.feelsLikeTemp = '';
        this.lowTemp = '';
        this.highTemp = '';
        this.time = null;
      }
    );
  }
}
