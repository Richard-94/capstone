
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../authentication/register/register/register.component';
import { NavbarEventEmitterService } from 'src/app/Event-Emitters-Services/navbar-event-emitter.service';
import { LoginComponent } from '../authentication/login/login/login.component';
import { AuthService } from 'src/app/Data-Services/services/auth.service';
import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/Event-Emitters-Services/user.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from 'src/app/Data-Services/services/user-service.service';
import { AllClass } from 'src/app/Classes/allClass';
import { EventDetails } from 'src/app/Generics/event-detail';
import { RecoverId } from 'src/app/Classes/recoverId';
import { UserIdService } from 'src/app/Data-Services/services/userId.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],


})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuCollapsed = true;
  private responseDataSubject = new BehaviorSubject<AllClass[]>([]);
  isMobileNavOpen: boolean = false;


  @Input() responseDataUser$?: Observable<RecoverId | undefined>;

  loginStatusSubscription: Subscription;
  showDialogEvent = new EventEmitter<void>();
  user: string = '';
  value: string = '';
  hint?:boolean
  text: string ='';
  searchResults?:AllClass[]
  username: string = '';
  image?:string
  constructor(
    public dialog: MatDialog,
    private dialogService: NavbarEventEmitterService,
    public authServ: AuthService,
    private userService: UserService,
    private router:Router,
    private userServ:UserServiceService,
    private dataServ:UserIdService
  ) {// Access the login status observable and initialize the login status
    this.loginStatusSubscription = this.authServ.loginStatus$.subscribe((isLoggedIn) => {
      this.username = isLoggedIn ? this.authServ.username ?? '' : '';
    });}

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
      // L'utente è autenticato, mostra il messaggio di benvenuto e il pulsante di logout
      this.authServ.login = true;
    }
    console.log('NavbarComponent ngOnInit'); // Add this line for debugging
    this.loginStatusSubscription = this.authServ.loginStatus$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        // User is logged in, update the UI with the username from AuthService
        this.username = this.authServ.username ?? '';
        console.log('Username:', this.username); // Add this line for debugging
      } else {
        // User is not logged in, reset the UI
        this.username = '';
      }
    });



    this.dialogService.responseDataUser$.subscribe((response)=>{
      //console.log(response);
      if(response){
        this.username = response.username as string

        this.dataServ.getSingle(this.username).subscribe((response:RecoverId)=>{
          console.log(response);


          if(response.avatar === null){
            this.image = response.avatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

          }

        })



      }

    })

    // this.userService.username$.subscribe((username) => {
    //   this.username = username;
    //   console.log('UserService username:', username); // Add this line for debugging
    // });
  }

  typedText(searchInput: HTMLInputElement) {
    let searchValue = searchInput.value
    searchValue = searchValue
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  // Resetta il valore dell'input
  searchInput.value = '';
  this.userServ.getSearchResults(searchValue).subscribe((response)=>{

    this.searchResults = response
    console.log('Fetched Details:', this.searchResults);

    this.dialogService.updateResponseData(this.searchResults)

  })


  this.router.navigate(['search',searchValue])

  return searchValue;
}

// onResponseSuccess(response: AllClass[]) {
//   this.responseDataSubject.next(response);
//   console.log('emitting');
// }


  ngOnDestroy() {
    // Check if loginStatusSubscription is defined before unsubscribing
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }



  onLoginSuccess(username: string) {
    // Handle the event emitted from the LoginComponent
    this.userService.setUsername(username);
  }

  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, isRegister: boolean): void {
    if(isRegister){

      this.dialog.open(LoginComponent, {
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }else{

      this.dialog.open(RegisterComponent, {
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }

  }

}


