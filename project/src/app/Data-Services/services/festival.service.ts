import { Injectable } from '@angular/core';
import { GeneralFetchService } from './generalFetch.service';
import { Festival} from 'src/app/Classes/festivalEvent';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FestivalService extends GeneralFetchService<Festival> {

  constructor(http: HttpClient) {
    super(http, 'http://localhost:8083/api/events');
  }
}
