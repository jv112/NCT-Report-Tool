import { Injectable } from '@angular/core';
import { Location } from './LocationClass';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locationList: Location[] = [];

  constructor() {
    this.locationList = [
      new Location('ubc', 49.26, -123.329, 4),
      new Location('sfu', 49.2780, -122.9146, 2),
    ]
  }

  addLocation(location: Location): void {
    // if (this.locationList.
    // }
  }

  getLocationList(): Location[] {
    return this.locationList;
  }
}
