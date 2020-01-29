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

  locationChange = new BehaviorSubject<any>(null);
  locationChange$ = this.locationChange.asObservable();

  constructor(private http: HttpClient, private weatherService: WeatherService) { }

  searchAutoComplete(input: string) {
    return this.http.get(`${this.serverUrl}/searchLocation/${input}`);
  }

  getLocationIP() {
    return this.http.get(`https://ipapi.co/json/`);
  }

  getLocationGeo() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  onLocationChange() {
    this.locationChange.next(null);
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
      try {
        this.getLocationGeo()
          .then((position: {coords: {latitude: string, longitude: string}}) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            this.weatherService.getCurrentWeather(lat, lon);
            this.reverseGeocode(lat, lon);
          });
      } catch {
        return this.getLocationIP().subscribe(
          (location: Place) => {
            lat = location.latitude;
            lon = location.longitude;
            this.weatherService.getCurrentWeather(lat, lon);
            this.reverseGeocode(lat, lon);
          }
        );
      }
    } else {
      this.weatherService.getCurrentWeather(lat, lon);
      this.reverseGeocode(lat, lon);
    }
  }
}
