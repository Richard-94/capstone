import { Injectable } from '@angular/core';
import { GeneralFetchService } from './generalFetch.service';
import { Festival } from 'src/app/Classes/festivalEvent';
import { HttpClient } from '@angular/common/http';
import { Sports } from 'src/app/Classes/sportEvent';
import { Observable } from 'rxjs';
import { Children } from 'src/app/Classes/children';

@Injectable({
  providedIn: 'root'
})
export class DetailsService{

  private  baseUrl = 'http://localhost:8083/api/events';
  constructor(private http: HttpClient) {

  }


  getEventsByTypeSport(eventType: string, id: number): Observable<Sports> {
    const url = `${this.baseUrl}/${eventType.toLowerCase()}/${id}`;
    console.log(url);
    return this.http.get<Sports>(url);
  }

  getEventsByTypeFestival(eventType: string, id: number): Observable<Festival> {
    const url = `${this.baseUrl}/${'food'}/${id}`;
    return this.http.get<Festival>(url);
  }

  getEventsByTypeChildren(eventType: string, id: number): Observable<Children> {
    const url = `${this.baseUrl}/${'children'}/${id}`;
    console.log(url);
    return this.http.get<Children>(url);
  }



}
