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
      new NuisanceReport('John Doe', '123 Main St', 'Jane Doe', new Date('2020-01-01T12:00:00'), 'This is a test report'),
      new NuisanceReport('Jane Doe', '123 Main St', 'John Doe', new Date('2020-01-01T12:00:00'), 'This is a test report'),
      new NuisanceReport('John Doe', '123 Main St', 'Jane Doe', new Date('2020-01-01T12:00:00'), 'This is a test report'),
      new NuisanceReport('Jane Doe', '123 Main St', 'John Doe', new Date('2020-01-01T12:00:00'), 'This is a test report'),
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
