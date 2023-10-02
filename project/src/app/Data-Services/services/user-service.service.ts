import { Injectable } from '@angular/core';
import { GeneralFetchService } from './generalFetch.service';
import { AllClass } from 'src/app/Classes/allClass';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Sports } from 'src/app/Classes/sportEvent';
import { Festival } from 'src/app/Classes/festivalEvent';
export type EventDetails = Sports | Festival;

@Injectable({
  providedIn: 'root'
})
export class UserServiceService{
  private selectedPostId: number | null = null;
  constructor(private http: HttpClient) { }
  private  baseUrl = 'http://localhost:8083/api/events/search';

  getSearchResults(eventType: string): Observable<AllClass[]> {
    const url = `${this.baseUrl}/${eventType}`;
    console.log(url);
    return this.http.get<AllClass[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error|| 'An error occurred. Please try again later.';
    return throwError(errorMessage);
  }
}
