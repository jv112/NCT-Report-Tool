import { Injectable } from '@angular/core';
import { NuisanceReport } from './ReportClass';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  reportList: NuisanceReport[] = [];

  constructor(private http: HttpClient) {
    this.http.get("https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/reportlist/").subscribe((data: any) => {
      this.reportList = data.data as NuisanceReport[];
    });
  }

  addReport(report: NuisanceReport): void {
    this.reportList.push(report);
    this.http.put("https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/reportlist/",
    {"key": "reportlist", "data": this.reportList}).subscribe(() => {
    });
  }

  removeReport(report: NuisanceReport): NuisanceReport[] {
    this.reportList = this.reportList.filter((r) => {
      return report.villain_name !== r.villain_name || report.time_reported !== r.time_reported;
    });
    this.http.put("https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/reportlist/",
    {"key": "reportlist", "data": this.reportList}).subscribe(() => {
    });
    return this.reportList;
  }

  getReport(time_reported: number): NuisanceReport {
    for (let r of this.reportList) {
      if (r.time_reported === time_reported) {
        return r;
      }
    }
    return new NuisanceReport('','','', 0, '', '');
  }

  getReportListObs(): Observable<any> {
    return this.http.get("https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/reportlist/");
  }

  closeReport(time_reported: number): void {
    for (let r of this.reportList) {
      if (r.time_reported === time_reported) {
        r.status = "CLOSED";
      }
    }
    this.http.put("https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/reportlist/",
        {"key": "reportlist", "data": this.reportList}).subscribe(() => {
        });
  }

}
