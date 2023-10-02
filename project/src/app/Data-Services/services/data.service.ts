import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";


import { Observable, catchError, delay, throwError } from "rxjs";
import { BASE_URL } from "src/app/modules/crud-modules/base-url.token";


@Injectable({
  providedIn: 'root'
})
export class DataService<T> {
  errorMessage: string = '';
  private selectedPostId: number | null = null;
  private selectedUser:string | null = null;
  private baseUrl!: string;
  Workers:[] = []
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item).pipe(delay(3000),
        catchError((error: HttpErrorResponse) => this.handleError(error))
    );
}

getSingle(user: string): Observable<T> {
  this.selectedUser = user;
  const url = `${this.baseUrl}/${user}`;
  //console.log(url);

  return this.http.get<T>(url).pipe(
    catchError(this.handleError)
  );
}



private handleError(error: HttpErrorResponse | null): Observable<never> {
  if (!error) {
    // Handle the scenario when error is null or undefined
    this.errorMessage = 'An unexpected error occurred (error is null or undefined).';
    return throwError(this.errorMessage);
  }

  if (error instanceof HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.errorMessage = 'An error occurred: ' + error.error.message;
    } else {
      this.errorMessage = error.error?.message || error.message || 'An unexpected server error occurred.';
    }
  } else {
    this.errorMessage = 'An unexpected error occurred.';
  }

  return throwError(this.errorMessage);
}

}
