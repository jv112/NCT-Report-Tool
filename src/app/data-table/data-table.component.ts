import { Component } from '@angular/core';
import { NuisanceReport } from '../ReportClass';
import { ReportService } from '../report.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit{

  reportList: NuisanceReport[] = [];

  constructor(private rs: ReportService) {
  }

  ngOnInit(): void {
    this.reportList = this.rs.getReports();
  }

  onDelete(name: string, time_reported: Date, status: string): void {
    if (status === 'OPEN') {
      alert('Cannot delete an active report');
      return;
    }
    if (confirm('Are you sure you want to delete this report?')) {
      this.reportList = this.rs.removeReport(name, time_reported.getTime());
    }
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
      return a.name < b.name ? -1 : 1;
    });
  }
  sortByTimeReported(): void {
    this.reportList = this.reportList.sort((a,b) => 
    { 
      return a.time_reported.getTime() - b.time_reported.getTime();
    });
  }
}
