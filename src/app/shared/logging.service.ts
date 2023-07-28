import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LoggingService {
  logStatusChange(status: string) {
    console.log('status is changed to: ' + status);
  }
}
