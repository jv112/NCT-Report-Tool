import { Component } from '@angular/core';
import { NuisanceReport } from '../ReportClass';
import { ReportService } from '../report.service';
import { OnInit } from '@angular/core';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  reportList: NuisanceReport[] = [];
  password_hash: string = "fcab0453879a2b2281bc5073e3f5fe54";

  constructor(private rs: ReportService, private router: Router) {
  }

  ngOnInit(): void {
    this.reportList = this.rs.getReportList();
  }

  onDelete(name: string, time_reported: Date, status: string): void {
    if (status === 'OPEN') {
      alert('Cannot delete an open report');
      return;
    }
    let password = prompt("Please enter the password to delete this report");
    if (password === null) return;
    let input_hash = Md5.hashStr(password);
    if (input_hash === this.password_hash) {
      this.reportList = this.rs.removeReport(name, time_reported.getTime());
    }
    else {
      alert("Incorrect password");
    }
  }

  onView(time_reported: Date): void {
    this.router.navigate(['/reports/view-report'], { state: { time_reported: time_reported } });
  }

  sortByLocation(): void {
    this.reportList = this.reportList.sort((a,b) => 
    { 
      return a.location < b.location ? -1 : 1; 
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
      return a.time_reported.getTime() - b.time_reported.getTime();
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
