import { HttpClient, HttpClientModule } from "@angular/common/http";

import { BASE_URL } from "./base-url.token";

import { dataServiceFactory } from "./data-service-factory";
import { DataService } from "src/app/Data-Services/services/data.service";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: BASE_URL,
      useValue: "",
    },
    {
      provide: DataService,
      useFactory: dataServiceFactory, // Replace with your factory function
      deps: [HttpClient, BASE_URL], // Add BASE_URL as a dependency
    }
  ]
})
export class DataModule { }
