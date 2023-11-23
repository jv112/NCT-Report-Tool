import { Injectable } from '@angular/core';
import { NuisanceReport } from './ReportClass';

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  reportList: NuisanceReport[] = [];

  constructor() {
    this.reportList = [
      {
        location: 'Zed',
        name: 'John',
        time_reported: new Date(),
        status: 'RESOLVED'
      },
      {
        location: 'Chennai',
        name: 'Smith',
        time_reported: new Date(),
        status: 'RESOLVED'
      },
      {
        location: 'Dbc',
        name: 'zmith',
        time_reported: new Date(),
        status: 'OPEN'
      },
      {
        location: 'Aef',
        name: 'Amith',
        time_reported: new Date(),
        status: 'RESOLVED'
      }
    ];
  }

  addReport(report: NuisanceReport): void {
    this.reportList.push(report);
  }

  removeReport(name: string, time_reported: number): NuisanceReport[] {
    this.reportList = this.reportList.filter((report) => {
      return report.name !== name || report.time_reported.getTime() !== time_reported;
    });
    return this.reportList;
  }

  getReports(): NuisanceReport[] {
    return this.reportList;
  }
}
