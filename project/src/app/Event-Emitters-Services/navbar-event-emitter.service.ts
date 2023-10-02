
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AllClass } from '../Classes/allClass';
import { RecoverId } from '../Classes/recoverId';
import { UserEvent } from '../Classes/userEvent';

@Injectable({
  providedIn: 'root'
})
export class NavbarEventEmitterService {

  // Create a Subject to emit events
  private showDialogSubject = new Subject<void>();
  showDialog$ = this.showDialogSubject.asObservable();

  private responseDataSubject = new BehaviorSubject<AllClass[]>([]);
  responseData$ = this.responseDataSubject.asObservable();

  private responseUserSubject = new BehaviorSubject<RecoverId | null>(null);
  responseDataUser$ = this.responseUserSubject.asObservable();


  private responseUserEventSubject = new BehaviorSubject<AllClass[] | null>(null);
  responseDataEvent$ = this.responseUserEventSubject.asObservable();


  // Method to trigger opening the dialog
  openDialog() {
    this.showDialogSubject.next();
  }

    private loginEventSubject = new Subject<void>();

    loginEvent$ = this.loginEventSubject.asObservable();

    emitLoginEvent() {
      this.loginEventSubject.next();
    }


  updateResponseData(data: AllClass[]) {
    this.responseDataSubject.next(data);
  }


  updateResponseDataUser(dataUser: RecoverId) {
    this.responseUserSubject.next(dataUser);
  }

  updateResponseDataUserEvent(dataUserEvent:AllClass[]) {
    this.responseUserEventSubject.next(dataUserEvent);
  }

}
