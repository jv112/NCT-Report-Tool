import { Injectable } from '@angular/core';
import { Location } from './LocationClass';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locationList: Location[] = [];

  constructor(private http: HttpClient) {
    this.updateLocalList();
  }

  updateLocalList(): void {
    this.locationList = [];
    this.http.get(`https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/locationlist/`).subscribe((data: any) => {
      for (let l of data.data) {
        this.locationList.push(new Location(l.location, l.lat, l.lng, l.count));
      }
    });
  }

  getLocationList() {
    return this.http.get(`https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/locationlist/`);
  }

  getLocalList(): Location[] {
    return this.locationList;
  }

  addLocationNew(location: Location): void {
    this.locationList.push(location);
    this.http.put(`https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/locationlist/`,
    {"key": "locationlist", "data": this.locationList}).subscribe(() => {
    });
  }

  addLocationCount(location: string): void {
    for (let l of this.locationList) {
      if (l.location === location) {
        l.count++;
        this.http.put(`https://272.selfip.net/apps/fc3MyU0pYX/collections/NCTReport/documents/locationlist/`,
        {"key": "locationlist", "data": this.locationList}).subscribe(() => {
        });
        return;
      }
    }
  }

}
