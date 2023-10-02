import { Injectable } from '@angular/core';
import { GeneralFetchService } from './generalFetch.service';
import { Sports } from 'src/app/Classes/sportEvent';
import { Festival } from 'src/app/Classes/festivalEvent';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AllClass } from 'src/app/Classes/allClass';
type UserEvents = Event[];
export type EventDetails = Sports | Festival;

@Injectable({
  providedIn: 'root'
})


export class AdminService {
  private selectedPostId: number | null = null;
  private eventUrl = 'http://localhost:8083/api/events';
  private type:string = ''

  private  baseUrl = 'http://localhost:8083/api/events/all';
  eventType: string = '';

  constructor(private http: HttpClient) {

  }

  getEventsByTypeSport(username: string): Observable<AllClass[]> {
    const url = `${this.baseUrl}/${username}`;
    return this.http.get<AllClass[]>(url);
  }



  getSingleEventSport(eventType: string, id: number): Observable<Sports> {
    const url = `${this.eventUrl}/${eventType.toLowerCase()+'s'}/${id}`;
    console.log(url);
    return this.http.get<Sports>(url);
      catchError(this.handleError)
  }


  getSingleEventFestival(eventType: string, id: number): Observable<Festival> {


    const url = `${this.eventUrl}/${eventType}/${id}`;
    console.log(url);
    return this.http.get<Festival>(url);
      catchError(this.handleError)
  }

  del(postId: number): Observable<AllClass> {
    const deleteUrl = `${this.baseUrl}/${postId}`;
    return this.http.delete<AllClass>(deleteUrl).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error&& 'An error occurred. Please try again later.';
    return throwError(errorMessage);
  }



}
