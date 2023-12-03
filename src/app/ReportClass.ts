export class NuisanceReport{
  villain_name: string;
  location: string;
  reported_by: string;
  time_reported: Date;
  status: string
  description: string;
  image_url: string;

  constructor(name: string, location: string, reported_by: string, time_reported: Date, description: string, url: string)
  {
    this.villain_name = name;
    this.location = location;
    this.reported_by = reported_by;
    this.time_reported = time_reported;
    this.status = "OPEN";
    this.description = description;
    this.image_url = url ? url : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png";
  }
}