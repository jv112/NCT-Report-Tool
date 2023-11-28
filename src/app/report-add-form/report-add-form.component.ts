import { Component } from '@angular/core';
import { ReportService } from '../report.service';
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NuisanceReport } from '../ReportClass';
import { Router } from '@angular/router';
import { LocationService } from '../location.service';
import { Location } from '../LocationClass';
import * as L from 'leaflet';

@Component({
  selector: 'app-report-add-form',
  templateUrl: './report-add-form.component.html',
  styleUrls: ['./report-add-form.component.css']
})

export class ReportAddFormComponent {
  private map: any;
  locationList: Location[];
  form: FormGroup;
  location: string;
  latlng: any;

  constructor(private rs: ReportService, private ls: LocationService, private router: Router) {
    let formControls = {
      name: new FormControl('',[
        Validators.required
      ]),
      reported_by: new FormControl('',[
        Validators.required
      ]),
      location: new FormControl(),
      desc: new FormControl('',[
        Validators.required
      ])
    }
    this.form = new FormGroup(formControls);
    this.locationList = this.ls.getLocationList();
    this.location = "none";
  }

  onSubmit(form: FormGroup): void {
    let form_value = form.value;
    let newReport: NuisanceReport;
    if (this.location === "select") {
      // add new location to location list
      newReport = new NuisanceReport(form_value.name, form_value.location, form_value.reported_by, new Date(), form_value.desc);
      this.ls.addLocationNew(new Location(form_value.location, this.latlng.lat, this.latlng.lng));
      
    }
    else { 
      // user selected a location from the dropdown
      newReport = new NuisanceReport(form_value.name, this.location, form_value.reported_by, new Date(), form_value.desc);
      this.ls.addLocationCount(this.location);
    }
    this.rs.addReport(newReport);
    this.reroute();
  }

  isValidForm(): boolean {
    if (this.location === "none") return false;
    if (this.location === "select" && this.latlng == null) return false;
    return true;
  }

  reroute(): void {
    this.router.navigate(["/reports"])
  }

  onSelect(value: string): void {
    this.location = value;
    if (value !== "select") {
      this.latlng = null;
    }
    if (this.location !== 'select') {
      this.form.get('location')!.setValue('');
  }
  };

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([49.24, -122.9999], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      if (this.location === "select") {
        let popup = L.popup();
        popup
          .setLatLng(e.latlng)
          .setContent("You have selected this location")
          .openOn(this.map);
        this.latlng = e.latlng;
      }
    });
    this.map.on('click', (e: any) => {
      this.latlng = e.latlng;
    });
  }
}
