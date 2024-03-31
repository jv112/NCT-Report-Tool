import { Injectable } from '@angular/core';
import { Location } from '../models/LocationClass';
import { EventEmitter } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() {}

  async getAllLocations(): Promise<Location[]> {
    return axios.get('http://localhost:3000/location')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async addLocation(location: Location): Promise<number> {
    return axios.post('http://localhost:3000/location', location)
      .then((response) => {
        return response.data.lid;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async increaseCount(lid: number): Promise<void> {
    return axios.put(`http://localhost:3000/location/${lid}/increase`)
      .then(() => {
        return;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async decreaseCount(lid: number): Promise<void> {
    return axios.put(`http://localhost:3000/location/${lid}/decrease`)
      .then(() => {
        return;
      })
      .catch((error) => {
        console.error(error);
      });
  }

}
