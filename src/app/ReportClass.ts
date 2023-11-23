export class NuisanceReport {

  location: string;
  name: string;
  time_reported: Date;
  status: string;

  constructor(location: string, name: string, time_reported: Date, status: string) 
  {
      this.location = location;
      this.name = name;
      this.time_reported = time_reported;
      this.status = status;
  }
}