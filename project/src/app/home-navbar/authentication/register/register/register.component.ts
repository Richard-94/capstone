
import { animate, animateChild, group, query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';
import { bounceOutLeftAnimation, fadeInAnimation } from 'src/app/Animations/animations';
import { NavbarEventEmitterService } from 'src/app/Event-Emitters-Services/navbar-event-emitter.service';

;
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SignUp } from 'src/app/Classes/signUp';
import { SignupService } from 'src/app/Data-Services/services/signup.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('todosAnimation', [
      transition(':enter', [
        group([
          query('.pop', [
            style({ transform: 'translateY(-20px)' }),
            animate(3000)
          ]),
          query('@todoAnimation',
            stagger(5000, animateChild()))
        ])
      ])
    ]),

    trigger('todoAnimation', [
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '5s'
          }
        })
      ])
    ]),
  ],
})
export class RegisterComponent {

  showForm?: boolean
  userData:  SignUp = new  SignUp();
  isSendPost: boolean = true;
  error?:Response;
  success:string = ""
  showPassword:boolean = false

  constructor(private dialogService: NavbarEventEmitterService,
    private SignupServ:SignupService,
    private dialogRef: MatDialogRef<RegisterComponent>) {} // Use AngularFireStorage here

  ngOnInit(): void {
    console.log('ciaoo');

    this.dialogService.showDialog$.subscribe(() => {
      this.showForm = true;
    });
  }

  myForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    telephone: new FormControl('', [Validators.required, Validators.pattern("[0-9-]+")]),
    address: new FormControl('', [Validators.required]),
    avatar: new FormControl(''),
  });


  updateUsersDataFromFormValues() {
    this.userData = {
      username: this.myForm.value.username || undefined,
      surname: this.myForm.value.surname || undefined,
      email: this.myForm.value.email || undefined,
      name: this.myForm.value.username || undefined,
      password: this.myForm.value.password || undefined,
      telephone: this.myForm.value.telephone || undefined,
      address: this.myForm.value.address || undefined,
      avatar: this.myForm.value.avatar || undefined,
    };
  }

  onCreatePost() {
    if (this.isSendPost && this.myForm.valid) {
      this.isSendPost = false
      console.log('Form Value:', this.myForm.value);
      this.updateUsersDataFromFormValues();
      this.SignupServ.create(this.userData).subscribe((response) => {
        console.log(response);
        this.isSendPost = true
        this.success = "Welcome please login to continue"
        //this.router.navigate(['/login'])
        // location.reload()
        //this.dialogRef.close();
      },
    (error)=>{
      this.handleServiceError(error);
      this.error = error
      this.isSendPost = true;
    }
      );
    }
 }

 public togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}


  private handleServiceError(error: Response) {
      console.log(error);

      //this.error = error;
      //this.customError = error;

  }
}
