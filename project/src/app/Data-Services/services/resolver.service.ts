import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, mapTo, of, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<Observable<boolean>>{
  constructor() { }
  resolve(): Observable<boolean> {
    // Emit true immediately to show the loading message
    return of(true);
  }
}
