import { Injectable } from '@angular/core';
import { Location } from './LocationClass';
import { HttpClient } from '@angular/common/http';
import { EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locationList: Location[];
  locationDataChanged = new EventEmitter<Location[]>();

  constructor(private http: HttpClient) {
    this.locationList = [];
    this.http.get("https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/locationlist/").subscribe((data: any) => {
      this.locationList = data.data as Location[];
    });
  }

  getLocationListObs(): Observable<any> {
    return this.http.get("https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/locationlist/");
  }

  getLocalList(): Location[] {
    return this.locationList;
  }

  addLocationNew(location: Location): Observable<any> {
    this.locationList.push(location);
    this.locationDataChanged.emit(this.locationList);
     return this.http.put("https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/locationlist/",
    {"key": "locationlist", "data": this.locationList});
  }

  addLocationCount(location: string): Observable<any> {
    for (let l of this.locationList) {
      if (l.location_name === location) {
        l.count++;
        this.locationDataChanged.emit(this.locationList);
      }
    }
    return this.http.put("https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/locationlist/",
        {"key": "locationlist", "data": this.locationList})
  }

  removeLocation(location: string): void {
    for (let l of this.locationList) {
      if (l.location_name === location) {
        l.count--;
      }
    }
    this.locationDataChanged.emit(this.locationList);
    this.http.put("https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/locationlist/",
    {"key": "locationlist", "data": this.locationList}).subscribe(() => {
    });
  }

}
