import { Injectable } from '@angular/core';
import { Location } from '../models/Location.class';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`http://localhost:3000/location`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => new Error('Error in fetching locations'));
      })
    );
  }

  addLocation(location: Location): Observable<number> {
    return this.http.post<number>(`http://localhost:3000/location`, location).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => new Error('Error in adding location'));
      })
    );
  }

  increaseCount(lid: number): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/location/${lid}/increase`, {}).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => new Error('Error in increasing count'));
      })
    );
  }

  decreaseCount(lid: number): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/location/${lid}/decrease`, {}).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => new Error('Error in decreasing count'));
      })
    );
  }

}
