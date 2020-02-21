USAGE:
This app is designed to display the current weather conditions and a 7 day forecast.

LOCATION:
The user's current location will be found using the 
navigator.geolocation.getCurrentPosition. If the user declines to share their position, the app will default to finding the current location with the user's IP address. Once the user is located, the coordinates are sent to Google's Places API and Dark Sky's weather API.
To change the displayed location, the search bar can be used. Input from this searchbar will send a request to Google's Places API and return a list of the 5 top matches of the current input. If one of these matches is selected, the data associated with that result is emitted using a Behavior Subject that the weather display is subscribed to. These components will update displaying the new data.

WEATHER:
Weather data is collected from Dark Sky's weather API. Weather data is collected when the app is initially opened, or when another location is selected using the search bar.

# WeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
