import { Component } from '@angular/core';
import { ReportService } from '../report.service';
import { NuisanceReport } from '../ReportClass';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent {
  report: NuisanceReport;
  image_url: string;
  password_hash: string = "fcab0453879a2b2281bc5073e3f5fe54";

  constructor(private rs: ReportService, private router: Router) {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation!.extras.state;
  
      if (state) {
          const time_reported: Date = state['time_reported'];
          this.report = this.rs.getReport(time_reported);
      } 
      else {
          this.report = new NuisanceReport('','','', new Date(), '', '');
      }
      this.image_url = this.report.image_url;
  }

  closeReport(): void {
    if (this.report.status === 'CLOSED') {
      alert('Cannot open a closed report');
      return;
    }
    
    let password = prompt("Please enter the password to change the status of this report");
    if (password === null) return;

    let input_hash = Md5.hashStr(password);
    if (input_hash === this.password_hash) {
      this.rs.closeReport(this.report.time_reported);
    }
    else {
      alert("Incorrect password");
    }
  }

  reroute(): void {
    this.router.navigate(["/reports"])
  }

}
