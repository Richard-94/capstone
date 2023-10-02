import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { GeneralFetchService } from "./generalFetch.service";
import { Workers } from "src/app/Classes/workers";

import { Injectable } from "@angular/core";
import { Sports } from "src/app/Classes/sportEvent";
import { Festival } from "src/app/Classes/festivalEvent";
import { Children } from "src/app/Classes/children";
import { Observable, catchError, throwError } from "rxjs";
import { UserEvent } from "src/app/Classes/userEvent";
import { AllClass } from "src/app/Classes/allClass";



@Injectable({
  providedIn: 'root'
})
export class HomeService{

  private  baseUrl = 'http://localhost:8083/api/events';
  private  url = 'http://localhost:8083/api/events/user/create';
  private  urluser = 'http://localhost:8083/api/events/user/find';

  constructor(private http: HttpClient) {

  }

  getEventsByTypeSport(eventType: string) {
    const url = `${this.baseUrl}?type=${eventType}`;
    return this.http.get<Sports[]>(url);
    catchError(this.handleError)
  }

  getEventsFavouriteEvents(username: string) {
    const url = `${this.urluser}/${username}`;
    console.log(url);

    return this.http.get<UserEvent[]>(url);
    console.log(url);

    catchError(this.handleError)
  }

  getEventsByTypeFestival(eventType: string) {
    const url = `${this.baseUrl}?type=${eventType}`;
    return this.http.get<Festival[]>(url);
    catchError(this.handleError)
  }

  getEventsByTypeChildren(eventType: string) {
    const url = `${this.baseUrl}?type=${eventType}`;
    return this.http.get<Children[]>(url);
    catchError(this.handleError)
  }


  createEvents(item:UserEvent): Observable<UserEvent> {
    const url = `${this.url}`;
    return this.http.post<UserEvent>(url, item).pipe(
      catchError(this.handleError)
    );
  }



  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error;
    return throwError(errorMessage);
  }


}
