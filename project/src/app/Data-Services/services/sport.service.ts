import { Injectable } from '@angular/core';
import { GeneralFetchService } from './generalFetch.service';
import {Sports } from 'src/app/Classes/sportEvent';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SportService extends GeneralFetchService<Sports> {


  constructor(http: HttpClient) {
    super(http, 'http://localhost:8083/api/events');
  }
}
