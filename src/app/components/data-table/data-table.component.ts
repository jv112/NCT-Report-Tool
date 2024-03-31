import { Component, OnInit, OnDestroy } from '@angular/core';
import { NuisanceReport } from '../../models/ReportClass';
import { ReportService } from '../../service/report.service';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';
import { LocationService } from '../../service/location.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnDestroy {
  reportList: NuisanceReport[] = [];
  password_hash: string = "fcab0453879a2b2281bc5073e3f5fe54";
  intervalId: any;

  constructor(private rs: ReportService, private ls: LocationService, private router: Router) {
  }

  ngOnInit(): void {
    this.rs.getAllReports().then((reports: NuisanceReport[]) => {
      this.reportList = reports;
    });
    this.intervalId = setInterval(() => {
      this.rs.getAllReports().then((reports: NuisanceReport[]) => {
        this.reportList = reports;
      });
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async onDelete(report: NuisanceReport): Promise<void> {
    if (report.status === 'OPEN') {
      alert('Cannot delete an open report');
      return;
    }
    let password = prompt("Please enter the password to delete this report");
    if (password === null) return;
    let input_hash = Md5.hashStr(password);
    if (input_hash === this.password_hash) {
      await this.rs.deleteReport(report.rid);
      this.reportList = await this.rs.getAllReports();
      this.ls.decreaseCount(report.lid);
    }
    else {
      alert("Incorrect password");
    }
  }

  onView(rid: number): void {
    this.router.navigate(['/reports/view-report'], { state: { rid: rid } });
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
