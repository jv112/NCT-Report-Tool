import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from '../location.service';
import { Location } from '../LocationClass';
import { icon, Marker } from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: any;

  constructor(private ls: LocationService) {}

  ngOnInit(): void {
    this.map = L.map('map').setView([49.24, -122.9999], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.ls.getLocationList().subscribe((data: any) => {
      for (let l of data.data) {
        L.marker([l.lat, l.lng]).addTo(this.map)
        .bindPopup("<b>" + l.location + "</b><br />" + l.count.toString() + " nuisance reports");
      }
    });
  }
}
