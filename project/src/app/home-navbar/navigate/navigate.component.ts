
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/Data-Services/services/auth.service';
import { NavbarEventEmitterService } from 'src/app/Event-Emitters-Services/navbar-event-emitter.service';
import { LoginComponent } from '../authentication/login/login/login.component';

import { RegisterComponent } from '../authentication/register/register/register.component';
import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss']
})
export class NavigateComponent {
  // showDialogEvent = new EventEmitter<void>();

  // value: string = '';
  // hint?:boolean
  // username: string = '';
  // constructor(
  //   public dialog: MatDialog,
  //   private dialogService: NavbarEventEmitterService,
  //   public authServ: AuthService
  // ) {}

  // ngOnInit() {
  //   // // Initialize the username based on the user's login status
  //   // if (this.authServ.isLoggedIn()) {
  //   //   // User is logged in, set hint to false
  //   //   this.hint = true;
  //   //   console.log("is" + this.hint);

  //   //   this.username = localStorage.getItem('username') || '';
  //   // } else {
  //   //   // User is not logged in, set hint to true
  //   //   this.hint = false;

  //   //   console.log("is logged" + this.hint);
  //   //   this.username = '';
  //   // }
  // }


  // openDialog(enterAnimationDuration: string, exitAnimationDuration: string, isRegister: boolean): void {
  //   if(isRegister){

  //     this.dialog.open(LoginComponent, {
  //       width: '500px',
  //       enterAnimationDuration,
  //       exitAnimationDuration,
  //     });
  //   }else{

  //     this.dialog.open(RegisterComponent, {
  //       width: '500px',
  //       enterAnimationDuration,
  //       exitAnimationDuration,
  //     });
  //   }

  // }
}


