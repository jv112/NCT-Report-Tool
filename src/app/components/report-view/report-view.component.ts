import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../service/report.service';
import { NuisanceReport } from '../../models/ReportClass';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {
  report!: NuisanceReport;
  password_hash: string = "fcab0453879a2b2281bc5073e3f5fe54";
  state = this.router.getCurrentNavigation()!.extras.state;

  constructor(private rs: ReportService, private router: Router) {}

  ngOnInit(): void {
    if (this.state) {
      const rid: number = this.state['rid'];
      this.rs.getReportByRid(rid).then((report: NuisanceReport) => {
        this.report = report;
      });
    }
  }
  
  closeReport(): void {
    if (this.report!.status === 'CLOSED') {
      alert('Cannot open a closed report');
      return;
    }

    let password = prompt("Please enter the password to change the status of this report");
    if (password === null) return;

    let input_hash = Md5.hashStr(password);
    if (input_hash === this.password_hash) {
      this.rs.closeReport(this.report.rid).then(() => {
        this.report.status = 'CLOSED';
      });
    }
    else {
      alert("Incorrect password");
    }
  }

  reroute(): void {
    this.router.navigate(["/reports"])
  }

}
