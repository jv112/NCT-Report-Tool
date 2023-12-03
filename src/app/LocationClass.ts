export class Location{
    location_name: string;
    lat: number;
    lng: number;
    count: number;

    constructor(location: string, latitude: number, longitude: number, count: number = 1) {
        this.location_name = location;
        this.lat = latitude;
        this.lng = longitude;
        this.count = count;
    }
}