export class Location{
    location: string;
    lat: number;
    lng: number;
    count: number;
    constructor(location: string, latitude: number, longitude: number) {
        this.location = location;
        this.lat = latitude;
        this.lng = longitude;
        this.count = 1;
    }
}