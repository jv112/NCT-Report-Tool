import { Component } from '@angular/core';
import { ReportService } from '../../service/report.service';
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NuisanceReport } from '../../models/Report.class';
import { Router } from '@angular/router';
import { LocationService } from '../../service/location.service';
import { Location } from '../../models/Location.class';
import { OnInit } from '@angular/core';
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
  selector: 'app-report-add-form',
  templateUrl: './report-add-form.component.html',
  styleUrls: ['./report-add-form.component.css']
})

export class ReportAddFormComponent implements OnInit {
  map: any;
  markers = L.layerGroup();
  markersMap = new Map<number, L.Marker>();

  form: FormGroup;
  locationList: Location[] = [];
  select_value: string = "none";
  latlng: any;

  constructor(private rs: ReportService, private ls: LocationService, private router: Router) {
    let formControls = {
      name: new FormControl('', [
        Validators.required,
        this.inputValidator as ValidatorFn
      ]),
      reported_by: new FormControl('', [
        Validators.required,
        this.inputValidator as ValidatorFn
      ]),
      url: new FormControl(),
      location: new FormControl('', [
        Validators.required,
        this.inputValidator as ValidatorFn
      ]),
      desc: new FormControl('', [
        Validators.required,
        this.inputValidator as ValidatorFn
      ])
    }
    this.form = new FormGroup(formControls);
  }

  ngOnInit(): void {
    this.map = L.map('map').setView([49.24, -122.9999], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    this.markers.addTo(this.map);

    this.ls.getAllLocations().subscribe((data) => {
      this.locationList = data;
      this.setMarkers();
    });

    this.map.on('click', (e: any) => {
      if (this.select_value === "select") {
        L.popup()
          .setLatLng(e.latlng)
          .setContent("You have selected this location")
          .openOn(this.map);
        this.latlng = e.latlng;
      }
    });
  }

  onSubmit(form: FormGroup): void {
    let form_value = form.value;
    let newReport: NuisanceReport;
    if (this.select_value === "select") {
      // Add the new location to location list
      this.ls.addLocation(new Location(1, form_value.location, this.latlng.lat, this.latlng.lng, 1)).subscribe((lid) => {
        newReport = new NuisanceReport(1, form_value.name, lid, form_value.location, form_value.reported_by, 
          new Date().getTime(), form_value.desc, form_value.url);
        this.rs.addReport(newReport).subscribe(() => {
          this.reroute();
        });
      });
    }
    else {
      // User selected a location from the dropdown
      this.ls.increaseCount(parseInt(this.select_value)).subscribe({error: (err) => console.error(err)});
      const location_name = this.locationList.find((l) => l.lid === parseInt(this.select_value))!.location_name;
      newReport = new NuisanceReport(1, form_value.name, parseInt(this.select_value), location_name, 
        form_value.reported_by, new Date().getTime(), form_value.desc, form_value.url);
      this.rs.addReport(newReport).subscribe(() => {
        this.reroute();
      });
    }
  }

  isValidForm(): boolean {
    if (this.select_value === "none") return false;
    if (this.select_value === "select" && this.latlng == null) return false;
    return true;
  }

  inputValidator(control: FormControl) {
    if (control.value.trim().length === 0) {
      return { 'whitespace': true };
    }
    return null;
  }

  onSelect(value: string): void {
    this.select_value = value;
    if (value === "none") {
      this.form.get('location')!.setValue('');
      this.resetMapView();
      this.markersMap.forEach((marker) => {
        marker.on('click', () => {
          marker.openPopup();
        });
      });
    }
    else if (value === "select") {
      this.latlng = null;
      this.form.get('location')!.setValue('');
      this.resetMapView();
      this.markersMap.forEach((marker) => {
        marker.off('click');
      });
    }
    else {
      this.form.get('location')!.setValue('null');
      this.flyTo(parseInt(value));
      this.markersMap.forEach((marker) => {
        marker.on('click', () => {
          marker.openPopup();
        });
      });
    }
  };

  setMarkers(): void {
    for (let l of this.locationList) {
      const marker = L.marker([l.lat, l.lng]).addTo(this.markers);
      marker.bindPopup(`<h6>${l.location_name}</h6>`);
      this.markersMap.set(l.lid, marker);
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

  resetMapView(): void {
    this.map.setView([49.24, -122.9999], 11);
    this.map.closePopup();
  }

  reroute(): void {
    this.router.navigate(["/reports"])
  }

}
