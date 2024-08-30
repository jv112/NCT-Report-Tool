export class Location {
    lid: number;
    location_name: string;
    lat: number;
    lng: number;
    count: number;

    constructor(lid: number, location_name: string, lat: number, lng: number, count: number) {
        this.lid = lid;
        this.location_name = location_name;
        this.lat = lat;
        this.lng = lng;
        this.count = count;
    }
}