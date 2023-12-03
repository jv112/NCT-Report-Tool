import { Injectable } from '@angular/core';
import { NuisanceReport } from './ReportClass';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  reportList: NuisanceReport[] = [];

  constructor(private http: HttpClient) {
    this.updateReportList();
  }

  updateReportList(): void {;
    this.http.get(`https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/reportlist/`).subscribe((data: any) => {
      for (let r of data.data) {
        this.reportList.push(new NuisanceReport(r.villain_name, r.location, r.reporter_name, new Date(r.time_reported), r.description, r.image_url));
      }
    });
  }

  addReport(report: NuisanceReport): void {
    this.reportList.push(report);
    this.http.put(`https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/reportlist/`,
    {"key": "reportlist", "data": this.reportList}).subscribe(() => {
    });
  }

  removeReport(name: string, time_reported: number): NuisanceReport[] {
    this.reportList = this.reportList.filter((report) => {
      return report.villain_name !== name || report.time_reported.getTime() !== time_reported;
    });
    this.http.put(`https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/reportlist/`,
    {"key": "reportlist", "data": this.reportList}).subscribe(() => {
    });
    return this.reportList;
  }

  getReport(time_reported: Date): NuisanceReport {
    for (let r of this.reportList) {
      if (r.time_reported.getTime() === time_reported.getTime()) {
        return r;
      }
    }
    return new NuisanceReport('','','', new Date(), '', '');
  }

  getReportList(): NuisanceReport[] {
    return this.reportList;
  }

  closeReport(time_reported: Date): void {
    for (let r of this.reportList) {
      if (r.time_reported.getTime() === time_reported.getTime()) {
        r.status = 'CLOSED';
        this.http.put(`https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/reportlist/`,
        {"key": "reportlist", "data": this.reportList}).subscribe(() => {
        });
        return;
      }
    }
  }

}
