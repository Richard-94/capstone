import { RecoverId } from 'src/app/Classes/recoverId';
import { Router } from '@angular/router';
import { UserIdService } from '../../../../Data-Services/services/userId.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { animate, animateChild, group, query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';
import { fadeInAnimation } from 'src/app/Animations/animations';
import { SignIn } from 'src/app/Classes/signIn';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavbarEventEmitterService } from 'src/app/Event-Emitters-Services/navbar-event-emitter.service';
import { SignInService } from 'src/app/Data-Services/services/sign-in.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/Data-Services/services/auth.service';
import { UserService } from 'src/app/Event-Emitters-Services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('todosAnimation', [
      transition(':enter', [
        group([
          query('.pop', [
            style({ transform: 'translateY(-20px)' }),
            animate(1000)
          ]),
          query('@todoAnimation',
            stagger(1000, animateChild()))
        ])
      ])
    ]),

    trigger('todoAnimation', [
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '1s'
          }
        })
      ])
    ]),
  ],
})
export class LoginComponent {


  showForm?: boolean
  userData:  SignIn = new  SignIn();
  isSendPost: boolean = true
  error?:Response;
  success?:Response
  public showPassword: boolean = false;
  user: string = '';
  value: string = '';
  hint?:boolean
  username: string = '';


  constructor(private dialogService: NavbarEventEmitterService,
    private signinServ:SignInService,
    private router:Router,
    public authServ:AuthService,
    private userService: UserService,
    private userId:UserIdService,
    private dialogRef: MatDialogRef<LoginComponent>) {} // Use AngularFireStorage here

  myForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),

  });

  updateWorkerDataFromFormValues() {
    this.userData = {
      username: this.myForm.value.username || undefined,
      password: this.myForm.value.password || undefined,
    };
  }


  onSend() {
    if (this.isSendPost && this.myForm.valid) {
      this.isSendPost = false;
      this.updateWorkerDataFromFormValues();
      this.signinServ.create(this.userData).subscribe(
        (response: any) => {
          //console.log(response);
          this.dialogService.updateResponseDataUser(response)



          const data = {
            accessToken: response.accessToken,
            username: response.username,
            id: response.id
          };

          //console.log(response);
          this.isSendPost = true;
          this.success = response.message;
          this.authServ.login = true;
          this.router.navigate(['']);


          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('username', data.username);
          localStorage.setItem('id', data.id);
          localStorage.setItem('token', data.accessToken);

          this.dialogRef.close();
        },
        (error: Response) => {
          this.handleServiceError(error);
          this.isSendPost = true;
        }
      );
    }
  }



public togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}

handleServiceError(error: any) {
  console.log(error);

     this.error = error;
     //this.customError = error.message;
     ;

 }



}
