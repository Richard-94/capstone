import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Festival } from 'src/app/Classes/festivalEvent';
import { Sports } from 'src/app/Classes/sportEvent';
import { AuthService } from 'src/app/Data-Services/services/auth.service';
import { AdminService } from 'src/app/Data-Services/services/admin.service';
import { AllClass } from 'src/app/Classes/allClass';
import { DetailsService } from 'src/app/Data-Services/services/details.service';
import { BehaviorSubject, Observable } from 'rxjs';

type UserEvents = Event[];



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit  {

  private responseDataSubject: BehaviorSubject<Sports | undefined> = new BehaviorSubject<Sports | undefined>(undefined);
  responseData$: Observable<Sports | undefined> = this.responseDataSubject.asObservable();

  private responseDataSubjectFestival: BehaviorSubject<Festival | undefined> = new BehaviorSubject<Festival | undefined>(undefined);
  responseDataFestival$: Observable<Festival| undefined> = this.responseDataSubjectFestival.asObservable();




  private truthySubject: BehaviorSubject<boolean| undefined> = new BehaviorSubject<boolean | undefined>(undefined);
  truthyData: Observable<boolean| undefined> = this.truthySubject.asObservable();



  viewMode:string = 'map'
  userEvents:AllClass[]=[];
  username: string = '';
  selectedEvent: string = ''; // Inizializza con l'evento predefinito (es. 'sports')
  detailsSport?:Sports;
  detailsFestival?:Festival;
 modify?:boolean
  private eventUrl = 'http://localhost:8083/api/events';




  constructor(public authServ:AuthService, private route:ActivatedRoute,private adminServ:AdminService,
    private detailsServ:DetailsService) {}
  ngOnInit(): void {
    this.username = localStorage.getItem('username') ?? '';
    this.adminServ.getEventsByTypeSport(this.username).subscribe((response:AllClass[])=>{

      this.userEvents = response
      console.log(response);

    })
  }

  deleteEvent(id:number){
    this.adminServ.del(id).subscribe((response)=>{
      const indexToRemove = this.userEvents.findIndex(item => item.id === id);
      if(indexToRemove !==-1){
        this.userEvents.splice(indexToRemove,1)
      }
      console.log(response);

    })
  }


activateViewMode(mode: string, eventId: number) {
  this.viewMode = mode;
  console.log(eventId);
  this.getSingleEventSport(mode, eventId);
  this.getSingleEventFestival(mode, eventId)


}

  getSingleEventSport(type = 'sport', id: number) {

    this.adminServ.getSingleEventSport(type = 'sport', id).subscribe(
      (response) => {
        this.modify = true
        this.detailsSport = response;
        console.log('Fetched Details:', this. detailsSport);
        this.respondIfSuccess(this.modify)
        this. onResponseSuccessSport(this.detailsSport);


        console.log('am i emitting a value?' +this.modify);
      },
      (error) => {
        console.error('Error fetching details:', error);
      }
    );
  }

  getSingleEventFestival(type: string, idEvent: number) {

    this.adminServ.getSingleEventFestival(type='food' , idEvent).subscribe(
      (response) => {
        this.modify = true
        this.detailsFestival = response;
        console.log('Fetched Details:', this.detailsFestival);
        this.respondIfSuccess(this.modify)
        this. onResponseSuccessFestival(this.detailsFestival);


        console.log('am i emitting a value?' +this.modify);
      },
      (error) => {
        console.error('Error fetching details:', error);
      }
    );
  }



  onResponseSuccessSport(response: Sports) {
    this.responseDataSubject.next(response);
  }

  onResponseSuccessFestival(response: Festival) {
    this.responseDataSubjectFestival.next(response);
  }

  respondIfSuccess(response:boolean){
    this.truthySubject.next(response)

  }



}



