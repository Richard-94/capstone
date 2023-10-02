import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralFetchService } from './services/generalFetch.service';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService extends GeneralFetchService<any>  {

  constructor(http: HttpClient) {
    super(http,'https://axqvoqvbfjpaamphztgd.functions.supabase.co/comuni');
  }

}
