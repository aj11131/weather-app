import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, OnDestroy } from '@angular/core';
import { LocationService } from '../shared/location.service';
import { WeatherService } from '../shared/weather.service';
import { GooglePlace } from '../shared/google-place.model';
import { GooglePlaces } from '../shared/google-places.model';
import { GoogleLocationDetail } from '../shared/google-location-detail.model';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('search', {static: true}) search: ElementRef;
  @ViewChild('searchContainer', {static: true}) searchContainer: ElementRef;
  results: GooglePlace[];
  lat: string;
  lon: string;
  searchBox;
  keyup$;
  searchSubscription: Subscription;

  constructor(private locationService: LocationService, private weatherService: WeatherService) { }

  ngAfterViewInit() {
    this.searchBox = this.search.nativeElement;
    this.keyup$ = fromEvent(this.searchBox, 'keyup');
    this.searchSubscription = this.keyup$.pipe(
      map((i: any) => i.currentTarget.value),
      debounceTime(500)
    ).subscribe(
      searchContent => {
        if (searchContent < 2 || !searchContent.match(/(^[a-zA-Z]|^\d)/)) {
          this.results = [];
        } else {
          this.locationService.searchAutoComplete(searchContent).subscribe(
            (results: GooglePlaces) => {
              this.results = results.predictions;
            }
          );
        }
      }
    );
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  // searchAutoComplete(e) {
  //   if (e.target.value) {

  //   } else {
  //     this.results = [];
  //     return;
  //   }
  // }

  onSelectResult(result: GooglePlace) {
    this.search.nativeElement.value = result.description;

    this.locationService.getLocationDetails(result.place_id).subscribe(
      (locationData: GoogleLocationDetail) => {
        this.lat = locationData.result.geometry.location.lat;
        this.lon = locationData.result.geometry.location.lng;
        this.locationService.getWeatherandLocation(this.lat, this.lon);
      }
    );

    if (this.searchContainer.nativeElement.style.display === 'block') {
      this.searchContainer.nativeElement.style.display = 'none';
    }

    this.results = [];
  }


  toggleSearchBar() {
    if (this.searchContainer.nativeElement.style.display === '' || this.searchContainer.nativeElement.style.display === 'none') {
      this.searchContainer.nativeElement.style.display = 'block';
    } else {
      this.searchContainer.nativeElement.style.display = 'none';
    }
  }

}
