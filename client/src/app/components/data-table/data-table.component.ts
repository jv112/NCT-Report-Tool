import { Component, OnInit } from '@angular/core';
import { NuisanceReport } from '../../models/Report.class';
import { ReportService } from '../../service/report.service';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';
import { LocationService } from '../../service/location.service';
import { Location } from '../../models/Location.class';
import { switchMap } from 'rxjs/operators';
import * as L from 'leaflet';
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
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  reportList: NuisanceReport[] = [];
  password_hash: string = "fcab0453879a2b2281bc5073e3f5fe54";

  // Map
  map: any;
  markers = L.layerGroup();
  markersMap = new Map<number, L.Marker>();
  countMap = new Map<number, number>();
  locationList: Location[] = [];

  constructor(private rs: ReportService, private ls: LocationService, private router: Router) { }

  ngOnInit(): void {
    this.rs.getAllReports().subscribe((reports: NuisanceReport[]) => {
      this.reportList = reports;
    });

    this.map = L.map('map').setView([49.24, -122.9999], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    this.markers.addTo(this.map);

    this.ls.getAllLocations().subscribe((locationList) => {
      this.locationList = locationList;
      this.updateMarkers();
    });
  }

  onDelete(report: NuisanceReport): void {
    if (report.status === 'OPEN') {
      alert('Cannot delete an open report');
      return;
    }

    const password = prompt("Please enter the password to delete this report");
    if (password === null) return;
    const input_hash = Md5.hashStr(password);
    if (input_hash !== this.password_hash) return;

    this.rs.deleteReport(report.rid).pipe(
      switchMap(() => this.ls.decreaseCount(report.lid)),
      switchMap(() => this.rs.getAllReports())
    ).subscribe((reports: NuisanceReport[]) => {
      this.reportList = reports;
    });
  }

  onView(rid: number): void {
    this.router.navigate(['/reports/view-report'], { state: { rid: rid } });
  }

  sortBy(value: string): void {
    switch (value) {
      case '1':
        this.sortByLocation(this.reportList);
        break;
      case '2':
        this.sortByName(this.reportList);
        break;
      case '3':
        this.sortByTimeReported(this.reportList);
        break;
      default:
        break;
    }
  }

  sortByLocation(reportList: NuisanceReport[]): void {
    this.reportList = reportList.sort((a, b) => {
      return a.location_name < b.location_name ? -1 : 1;
    });
  }

  sortByName(reportList: NuisanceReport[]): void {
    this.reportList = reportList.sort((a, b) => {
      return a.villain_name < b.villain_name ? -1 : 1;
    });
  }
  sortByTimeReported(reportList: NuisanceReport[]): void {
    this.reportList = reportList.sort((a, b) => {
      return a.time_reported - b.time_reported;
    });
  }

  updateMarkers(): void {
    for (let l of this.locationList) {
      let marker = this.markersMap.get(l.lid);
      let count = this.countMap.get(l.lid);

      // Add marker if the location doesn't exist
      if (!marker) {
        marker = L.marker([l.lat, l.lng]).addTo(this.markers);
        marker.bindPopup(`<b>${l.location_name}</b><br>${l.count} reports`);
        this.markersMap.set(l.lid, marker);
        this.countMap.set(l.lid, l.count);
      }
      // Remove marker if marker exists and location has no reports
      else if (marker && l.count === 0) {
        marker.remove();
        this.markersMap.delete(l.lid);
        this.countMap.delete(l.lid);
      }
      // Update marker popup content if marker exists and count has changed
      else if (marker && count !== l.count) {
        marker.setPopupContent(`<b>${l.location_name}</b><br>${l.count} reports`);
        this.countMap.set(l.lid, l.count);
      }
      // Continue to next location if marker exists and count hasn't changed
    }
  }

  flyTo(lid :number): void {
    const location = this.locationList.find(l => l.lid === lid)!;
    const latLng = [location.lat, location.lng];
    const marker = this.markersMap.get(lid)!;

    this.map.flyTo(latLng, 13);
    marker.openPopup();
    window.scroll(0, 0);
  }

}
