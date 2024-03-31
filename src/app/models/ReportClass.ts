export class NuisanceReport{
  rid: number;
  villain_name: string;
  lid: number;
  location_name: string;
  reported_by: string;
  time_reported: number;
  status: string
  description: string;
  image_url: string;

  constructor(rid: number, name: string, lid: number, location: string, reported_by: string, time_reported: number, description: string, url: string, status?: string)
  {
    this.rid = rid;
    this.villain_name = name;
    this.lid = lid;
    this.location_name = location;
    this.reported_by = reported_by;
    this.time_reported = time_reported;
    this.status = status ? status : "OPEN";
    this.description = description;
    this.image_url = url ? url : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png";
  }
}