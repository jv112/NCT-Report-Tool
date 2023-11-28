import { Injectable } from '@angular/core';
import { Location } from './LocationClass';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locationList: Location[] = [];

  constructor() {
    this.locationList = [
      new Location('UBC Vancouver', 49.25, -123.22),
      new Location('SFU Burnaby', 49.265, -122.9146),
    ]
  }

  addLocationNew(location: Location): void {
    this.locationList.push(location);
  }

  addLocationCount(location: string): void {
    for (let loc of this.locationList) {
      if (loc.location === location) {
        loc.count++;
        return;
      }
    }
  }

  getLocationList(): Location[] {
    return this.locationList;
  }
}
