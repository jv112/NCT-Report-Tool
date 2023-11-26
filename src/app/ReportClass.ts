interface Report {
  name: string;
  location: string;
  reported_by: string;
  time_reported: Date;
  status: string;
  description: string;

}

export class NuisanceReport implements Report {
  name: string;
  location: string;
  reported_by: string;
  time_reported: Date;
  status: string
  description: string;

  constructor(name: string, location: string, reported_by: string, time_reported: Date, description: string)
  {
    this.name = name;
    this.location = location;
    this.reported_by = reported_by;
    this.time_reported = time_reported;
    this.status = "OPEN";
    this.description = description;
  }
}