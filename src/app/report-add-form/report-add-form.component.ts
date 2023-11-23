import { Component } from '@angular/core';
import { ReportService } from '../report.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NuisanceReport } from '../ReportClass';

@Component({
  selector: 'app-report-add-form',
  templateUrl: './report-add-form.component.html',
  styleUrls: ['./report-add-form.component.css']
})

export class ReportAddFormComponent {
  form: FormGroup;
  constructor(private rs: ReportService) {
    let formControls = {
      location: new FormControl(),
      name: new FormControl(),
      time_reported: new FormControl(),
      status: new FormControl()
    }
    this.form = new FormGroup(formControls);
  }

  onSubmit(form: FormGroup): void {
    let form_value = form.value;
    let newReport = new NuisanceReport(form_value.location, form_value.name, form_value.time_reported, form_value.status);
    this.rs.addReport(newReport);
  }
}
