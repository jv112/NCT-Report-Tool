export class NuisanceReport{
  villain_name: string;
  location_name: string;
  reported_by: string;
  time_reported: number;
  status: string
  description: string;
  image_url: string;

  constructor(name: string, location: string, reported_by: string, time_reported: number, description: string, url: string, status?: string)
  {
    this.villain_name = name;
    this.location_name = location;
    this.reported_by = reported_by;
    this.time_reported = time_reported;
    this.status = status ? status : "OPEN";
    this.description = description;
    this.image_url = url ? url : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png";
  }
}