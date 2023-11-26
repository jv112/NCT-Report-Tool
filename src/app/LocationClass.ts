export class Location{
    location: string;
    longitude: number;
    latitude: number;
    count: number;
    constructor(location: string, longitude: number, latitude: number, count: number) {
        this.location = location;
        this.longitude = longitude;
        this.latitude = latitude;
        this.count = count;
    }
}