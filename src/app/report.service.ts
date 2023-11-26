import { Injectable } from '@angular/core';
import { NuisanceReport } from './ReportClass';
import { Location } from './LocationClass';

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  reportList: NuisanceReport[] = [];

  constructor() {
    this.reportList = [
      new NuisanceReport('aohn Doe', '123 Main St', 'Jane Doe', new Date('2020-01-01T12:00:00'), 'This is a test report'),
      new NuisanceReport('bane Doe', '523 Main St', 'John Doe', new Date('2020-09-01T12:00:00'), 'This is a test report'),
      new NuisanceReport('dohn Doe', '323 Main St', 'Jane Doe', new Date('2020-05-01T12:00:00'), 'This is a test report'),
      new NuisanceReport('cane Doe', '223 Main St', 'John Doe', new Date('2020-03-01T12:00:00'), 'This is a test report'),
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
