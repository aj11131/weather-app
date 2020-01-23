import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Place } from './place.model';

@Injectable({providedIn: 'root'})
  export class LocationService {
  positionObj: {latitude: string, longitude: string};
  currentLocation: string;
  serverUrl = environment.baseUrl;
  lat: string;
  lon: string;

  positionData = new BehaviorSubject<any>(null);
  positionData$ = this.positionData.asObservable();

  constructor(private http: HttpClient, private weatherService: WeatherService) { }

  searchAutoComplete(input: string) {
    return this.http.get(`${this.serverUrl}/searchLocation/${input}`);
  }

  getLocation() {
    return this.http.get(`http://ip-api.com/json`);
  }

  reverseGeocode(lat: string, lon: string) {
    return this.http.get(`${this.serverUrl}/reverseGeocode/${lat}/${lon}`).subscribe(
      location => {
        this.positionData.next(location);
      }
    );
  }

  getLocationDetails(placeId: string) {
    return this.http.get(`${this.serverUrl}/locationDetails/${placeId}`);
  }

  getWeatherandLocation(lat = null, lon = null) {
    if (!lat && !lon) {
      return this.getLocation().subscribe(
        (location: Place) => {
          lat = location.lat;
          lon = location.lon;
          this.weatherService.getCurrentWeather(lat, lon);
          this.reverseGeocode(lat, lon);
        }
      );
    } else {
      this.weatherService.getCurrentWeather(lat, lon);
      this.reverseGeocode(lat, lon);
    }
  }
}
