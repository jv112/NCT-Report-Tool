import { Injectable } from '@angular/core';
import { NuisanceReport } from '../models/Report.class';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) {}

  getReportByRid(rid: number): Observable<NuisanceReport> {
    return this.http.get<NuisanceReport>(`http://localhost:3000/reports/${rid}`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => new Error('Error in fetching report'));
      })
    );
  }

  getAllReports(): Observable<NuisanceReport[]> {
    return this.http.get<NuisanceReport[]>('http://localhost:3000/reports').pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => new Error('Error in fetching reports'));
      })
    );
  }

  addReport(report: NuisanceReport): Observable<void> {
      return this.http.post<void>('http://localhost:3000/reports', report).pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => new Error('Error in adding report'));
        })
    );
  }

  deleteReport(rid: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/reports/${rid}`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => new Error('Error in deleting report'));
      })
    );
  }

  closeReport(rid: number): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/reports/close/${rid}`, {}).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => new Error('Error in closing report'));
      })
    );
  }

}
