import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentComponent } from './weather-display/current/current.component';
import { HeaderComponent } from './header/header.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { InfoComponent } from './weather-display/info/info.component';
import { ForecastComponent } from './weather-display/forecast/forecast.component';
import { ForecastItemComponent } from './weather-display/forecast/forecast-item/forecast-item.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './header/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentComponent,
    HeaderComponent,
    WeatherDisplayComponent,
    InfoComponent,
    ForecastComponent,
    ForecastItemComponent,
    FooterComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
