import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from './weather.model';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherData = new BehaviorSubject<any>(null);
  weatherData$ = this.weatherData.asObservable();

  constructor(private http: HttpClient) { }

  serverUrl = environment.baseUrl;

  getCurrentWeather(latitude: string, longitude: string) {
    return this.http.get(`${this.serverUrl}/weather/${latitude}/${longitude}`)
    .subscribe(
      (weather: Weather) => {
        this.weatherData.next(weather);
      }
    );
  }
}
