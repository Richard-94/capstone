import { Children } from './../../Classes/children';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralFetchService } from './generalFetch.service';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService extends GeneralFetchService<Children> {


  constructor(http: HttpClient) {
    super(http, 'http://localhost:8083/api/events');
  }

}
