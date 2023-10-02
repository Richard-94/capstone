import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";

import { Observable, catchError, throwError } from "rxjs";
import { BASE_URL } from "src/app/modules/crud-modules/base-url.token";

@Injectable({
  providedIn: 'root'
})
export class GeneralFetchService<T>{
  private selectedPostId: number | null = null;
  private selectedUsername:string | null = null;
  private baseUrl!: string;
  Workers:[] = []
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }


  getAllEvents(url: string): Observable<T[]> {
    return this.http.get<T[]>(url).pipe(
      catchError(this.handleError)
    );
  }


  create(item:T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item).pipe(
      catchError(this.handleError)
    );
  }

  getSingle(postId: number): Observable<T> {
    this.selectedPostId = postId;
    const getId = `${this.baseUrl}/${postId}`;
    return this.http.get<T>(getId).pipe(
      catchError(this.handleError)
    );
  }

  getSingleEvent(eventType:string, postId: number): Observable<T> {

    this.selectedPostId = postId;
    const getId = `${this.baseUrl}/${eventType.toLowerCase()}/${postId}`;
    return this.http.get<T>(getId).pipe(
      catchError(this.handleError)
    );
  }

  getSingleUsername(username: string): Observable<T> {
    this.selectedUsername = username;
    const getId = `${this.baseUrl}/${username}`;
    return this.http.get<T>(getId).pipe(
      catchError(this.handleError)
    );
  }


  update(workerData: T): Observable<T> {
    if (this.selectedPostId !== null) {
      const updateUrl = `${this.baseUrl}/${this.selectedPostId}`;
      this.selectedPostId = null; // Clear the selectedPostId after update
      return this.http.put<T>(updateUrl, workerData)
      .pipe(
        catchError(this.handleError)
      );
    }
    return new Observable(); // Return a dummy observable if selectedPostId is null
  }

  del(postId: number): Observable<T> {
    const deleteUrl = `${this.baseUrl}/${postId}`;
    return this.http.delete<T>(deleteUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    const errorMessage = error.error&& 'An error occurred. Please try again later.';
    return throwError(errorMessage);
  }


}
