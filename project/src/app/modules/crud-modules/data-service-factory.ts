import { HttpClient } from "@angular/common/http";
import { DataService } from "src/app/Data-Services/services/data.service";



export function dataServiceFactory(http: HttpClient, baseUrl: string): DataService<any> {
  return new DataService<any>(http, baseUrl);
}
