import { Component, OnInit } from '@angular/core';
import { NuisanceReport } from '../ReportClass';
import { ReportService } from '../report.service';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  reportList: NuisanceReport[] = [];
  password_hash: string = "fcab0453879a2b2281bc5073e3f5fe54";

  constructor(private rs: ReportService, private ls: LocationService, private router: Router) {
  }

  ngOnInit(): void {
    this.rs.getReportListObs().subscribe((data: any) => {
      this.reportList = data.data as NuisanceReport[];
    });
  }

  onDelete(time_reported: number, status: string): void {
    if (status === 'OPEN') {
      alert('Cannot delete an open report');
      return;
    }
    let password = prompt("Please enter the password to delete this report");
    if (password === null) return;
    let input_hash = Md5.hashStr(password);
    if (input_hash === this.password_hash) {
      let report = this.rs.getReport(time_reported);
      this.reportList = this.rs.removeReport(report);
      this.ls.removeLocation(report.location_name);
    }
    else {
      alert("Incorrect password");
    }
  }

  onView(time_reported: number): void {
    this.router.navigate(['/reports/view-report'], { state: { time_reported: time_reported } });
  }

  sortByLocation(): void {
    this.reportList = this.reportList.sort((a,b) => 
    { 
      return a.location_name < b.location_name ? -1 : 1; 
    });
  }

  sortByName(): void {
    this.reportList = this.reportList.sort((a,b) => 
    { 
      return a.villain_name < b.villain_name ? -1 : 1;
    });
  }
  sortByTimeReported(): void {
    this.reportList = this.reportList.sort((a,b) => 
    { 
      return a.time_reported - b.time_reported;
    });
  }

  sortBy(value: string): void {
    switch(value) {
      case '1':
        this.sortByLocation();
        break;
      case '2':
        this.sortByName();
        break;
      case '3':
        this.sortByTimeReported();
        break;
      default:
        break;
    }
  }
}
