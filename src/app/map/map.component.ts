import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from '../location.service';
import { Location } from '../LocationClass';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit{
  private map: any;
  locationList: Location[];

  constructor(private ls: LocationService) { 
    this.locationList = [];
  }

  ngAfterViewInit(): void {
    this.locationList = this.ls.getLocationList();

    this.map = L.map('map').setView([49.24, -122.9999], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    for (let loc of this.locationList) {
      L.marker([loc.lat, loc.lng]).addTo(this.map)
      .bindPopup("<b>" + loc.location + "</b><br />" + loc.count.toString() + " nuisance reports");
    }
  }
}
