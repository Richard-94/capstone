
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserIdService } from "./userId.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private jwtHelper:JwtHelperService,private router:Router, private userId:UserIdService,) {
  }

  username?:string = '';
  error?:Response;
  user?:string;
  login:boolean = false;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  loginStatus$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  setLoginStatus(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn);
  }



   logout() {
     console.log('Logout button clicked');
     localStorage.removeItem('token');
     localStorage.removeItem('username');
     localStorage.removeItem('background')
     this.login = false;
     let isLoggedIn = localStorage.getItem('isLoggedIn');
     localStorage.removeItem('isLoggedIn');
     this.router.navigate([''])


    console.log("L'utente è fuori " + this.login);

   }



   checkLoginStatus(): boolean {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.username = localStorage.getItem('username') || '';
      this.login = true;
    } else {
      this.username = '';
      this.login = false;
    }

    // Set the login status based on the result
    this.setLoginStatus(this.login);

    return this.login; // Return the login status as a boolean
  }


    get currentUser() {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        //console.log('Decoded Token:', decodedToken);
        const roles = decodedToken.roles;
        //console.log('User Roles:', roles);
        //console.log('Accessing currentUser in Component X:', decodedToken);
        const userId = decodedToken.sub;
        //console.log(userId);
        return decodedToken;
      } else {
        return false;
      }

  }

  recoverUserInfo(username:string){
    this.username = localStorage.getItem('username') || '';
    //console.log(this.username);
    //console.log(this.username);
    this.userId.getSingle(this.username).subscribe((response)=>{
      //console.log(this.user);

      //console.log(response);
      return response

    }
    , (error)=>{
      this.handleServiceError(error)

     })

  }

  handleServiceError(error: any) {
    //console.log(error);

       this.error = error;
       //this.customError = error.message;
       ;

   }



}
