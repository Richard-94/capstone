import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Festival } from 'src/app/Classes/festivalEvent';
import { Sports } from 'src/app/Classes/sportEvent';

export type EventDetails = Sports | Festival;

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private selectedPostId: number | null = null;
  constructor(private http: HttpClient) { }
  private  baseUrl = 'http://localhost:8083/api/events';

  update(sportsData: EventDetails, eventType: string, id: number): Observable<EventDetails> {
    const url = `${this.baseUrl}/${eventType}/${id}`;
    console.log(url);

    // Log the workerData before sending it in the request
    console.log('Updating Event Data:', sportsData);

    return this.http.put<EventDetails>(url, sportsData)
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
