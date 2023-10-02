

import { ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AllClass } from 'src/app/Classes/allClass';
import { Children } from 'src/app/Classes/children';
import { Festival } from 'src/app/Classes/festivalEvent';
import { RecoverId } from 'src/app/Classes/recoverId';

import {   Sports } from 'src/app/Classes/sportEvent';
import { UserEvent } from 'src/app/Classes/userEvent';

import { AuthService } from 'src/app/Data-Services/services/auth.service';
import { HomeService } from 'src/app/Data-Services/services/home.service';
import { UserIdService } from 'src/app/Data-Services/services/userId.service';
import { NavbarEventEmitterService } from 'src/app/Event-Emitters-Services/navbar-event-emitter.service';
import { UserService } from 'src/app/Event-Emitters-Services/user.service';
import { WarningComponent } from 'src/app/warning/warning.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  images = ["https://images.pexels.com/photos/6054108/pexels-photo-6054108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/14537977/pexels-photo-14537977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/90454/pexels-photo-90454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]

  public pipeText: string = `
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi quaerat odit dolores facil
  perferendis accusantium inventore id, mollitia reiciendis aut amet? Dolores obcaecati nostrum repellendus doloribus unde a ullam fugiat!
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam asperiores, dignissimos alias iure, rerum sunt laudantium quas,
  aspernatur minima soluta sit ad officiis reprehenderit veritatis quia nesciunt debitis ipsum ab.
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione totam, tempora fuga consequuntur
  perferendis itaque nemo magnam facilis aspernatur dolorem ad, repellendus porro ullam, doloribus dicta? Soluta magnam ab voluptates.
`;

@Input() responseDataUser$?: Observable<RecoverId | undefined>;



public showFullText: boolean = false;
private refreshTriggered: boolean = false;

  sportEvents: Sports[] = [];
  festivalEvent: Festival[]=[];
  favoriteEvents: UserEvent[] = [];

  children: Children[]=[];
  isSendPost: boolean = true;
  error?: Response;
  errorUserEvent?:Response
  currentIndex = 0;
  saveHeart?:string
  //background:boolean = false;
  username?:string
  background: { [key: number]: boolean } = {};
  //color:boolean = false
  data?:UserEvent;
  isActive?:boolean = false;
  isActiveArray: boolean[] = [];



  constructor(
    public authServ: AuthService,
    public homeService: HomeService,
    private ngZone: NgZone,
    private route:ActivatedRoute,
    public dialog: MatDialog,
    private dataServ:UserIdService,
    private userServ:UserService,
    private dialogService:NavbarEventEmitterService,
    private router:Router,
    private cdRef: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    const storedBackground = localStorage.getItem('background');
    if (storedBackground) {
      this.background = JSON.parse(storedBackground);
    }

    this.dialogService.responseDataUser$.subscribe((response)=>{
      console.log(response);
      if(response){
        this.username = response.username
        if(this.username){
          this.homeService.getEventsFavouriteEvents(this.username).subscribe((response) => {
            console.log(response);
            this.dialogService.updateResponseDataUserEvent(response)
            this.isActiveArray = response.map((userEvent) => userEvent.favourite === true);
          });
        }
      }
      this.cdRef.detectChanges();
    });

    this.homeService.getEventsByTypeFestival("food").subscribe(

      (response) => {
        console.log(response);
        this.festivalEvent = response;

        for(let i = 0;i<this.festivalEvent.length;i++){
          if(this.festivalEvent[i].eventType==="Food_festival"){
            this.festivalEvent[i].eventType="Food Festival"
          }
        }

      },
      (error) => {
        this.handleServiceError(error);
        this.error = error;
        this.isSendPost = true;
      }
    );

    this.homeService.getEventsByTypeSport("sports").subscribe(
      (response) => {
        console.log(response);
        this.sportEvents = response;
      },
      (error) => {
        this.handleServiceError(error);
        this.error = error;
        this.isSendPost = true;
      }
    );

    this.homeService.getEventsByTypeChildren("children").subscribe(
      (response) => {
        console.log(response);
        this.children = response;
      },
      (error) => {
        this.handleServiceError(error);
        this.error = error;
        this.isSendPost = true;
      }
    );
  }




  private handleServiceError(error: Response) {
    //console.log(error);
    this.error = error;

  }

  // favourites(index:any){
  //   if(this.authServ.login){
  //     index.isActive = !index.isActive
  //     localStorage.setItem('active', index.isActive.toString());
  //   }else{
  //     this.openDialog('3000ms', '1500ms');

  //   }

  // }

  favourites(eventId: number) {
    if (this.authServ.login) {
      console.log('ciaoo');

      let username = localStorage.getItem('username') ?? '';
      if (username) {
        this.dataServ.getSingle(username).subscribe(
          (response: RecoverId) => {
            // Assign the 'id' from the response to 'this.data.userId'
            this.data = new UserEvent();
            this.data.eventId = eventId;
            this.data.userId = response.id; // Set userId here
            console.log(this.data);

            // Find the clicked event by its eventId and toggle its favourite property
            const clickedEvent = this.festivalEvent.find(event => event.id === eventId);
            if (clickedEvent) {
              clickedEvent.favourite = !clickedEvent.favourite;

              // Send the request to create/update the event
               this.homeService.createEvents(this.data).subscribe(
                 (response) => {
                   console.log(response);
                 },
                 (error) => {
                   this.handleServiceError(error);
                   this.errorUserEvent = this.error;
                   alert(this.errorUserEvent);
                   this.isSendPost = true;
                 }
               );
            }
          },
          (error) => {
            console.error(error);
          }
        );
      }
    } else {
      this.openDialog('3000ms', '1500ms');
    }
  }



  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {


      this.dialog.open(WarningComponent, {
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }



}
