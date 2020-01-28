import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/shared/place.model';
import { GooglePlace } from 'src/app/shared/google-place.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() result: GooglePlace;
  topLine: string;
  secondLine: string;

  constructor() { }

  ngOnInit() {
    this.topLine = this.result.structured_formatting.main_text;
    this.secondLine = this.result.structured_formatting.secondary_text;
  }
}
