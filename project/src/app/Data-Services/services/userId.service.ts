import { HttpClient } from '@angular/common/http';

import { DataService } from './data.service';
import { RecoverId } from '../../Classes/recoverId';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserIdService extends DataService <RecoverId>  {




constructor(http: HttpClient) {
  super(http, 'http://localhost:8083/api/auth');
}

}
