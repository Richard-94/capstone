import { Injectable } from '@angular/core';
import { GeneralFetchService } from './generalFetch.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegionService extends GeneralFetchService<any> {

  constructor(http: HttpClient) {
    super(http,'https://axqvoqvbfjpaamphztgd.functions.supabase.co/regioni');
  }
}
