import { Component } from '@angular/core';
import { ReportService } from '../../service/report.service';
import { FormGroup, FormControl, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NuisanceReport } from '../../models/ReportClass';
import { Router } from '@angular/router';
import { LocationService } from '../../service/location.service';
import { Location } from '../../models/LocationClass';
import { OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-report-add-form',
  templateUrl: './report-add-form.component.html',
  styleUrls: ['./report-add-form.component.css']
})

export class ReportAddFormComponent implements OnInit {
  private map: any;
  locationList: Location[] = [];
  form: FormGroup;

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
    ls.getAllLocations().then((data) => {
      this.locationList = data;
    });
  }

  ngOnInit(): void {
    this.map = L.map('map').setView([49.24, -122.9999], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      if (this.select_value === "select") {
        let popup = L.popup();
        popup
          .setLatLng(e.latlng)
          .setContent("You have selected this location")
          .openOn(this.map);
        this.latlng = e.latlng;
        popup.on("remove", () => {
          this.latlng = null;
        });
      }
    });
  }

  async onSubmit(form: FormGroup): Promise<void> {
    let form_value = form.value;
    let newReport: NuisanceReport;
    if (this.select_value === "select") {
      // add new location to location list
      const lid = await this.ls.addLocation(new Location(1, form_value.location, this.latlng.lat, this.latlng.lng, 1));
      newReport = new NuisanceReport(1, form_value.name, lid, form_value.location, form_value.reported_by, new Date().getTime(), form_value.desc, form_value.url);
    }
    else {
      // user selected a location from the dropdown
      newReport = new NuisanceReport(1, form_value.name, parseInt(this.select_value), this.select_value, form_value.reported_by, new Date().getTime(), form_value.desc, form_value.url);
      await this.ls.increaseCount(parseInt(this.select_value));
    }
    this.rs.addReport(newReport);
    this.reroute();
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
    if (value === "none" || value === "select") {
      this.latlng = null;
      this.form.get('location')!.setValue('');
    }
    else {
      this.form.get('location')!.setValue('null');
    }
    this.map.closePopup();
  };

  reroute(): void {
    this.router.navigate(["/reports"])
  }

}
