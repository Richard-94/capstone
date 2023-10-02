import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { NavbarEventEmitterService } from 'src/app/Event-Emitters-Services/navbar-event-emitter.service';
import { AllClass } from '../Classes/allClass';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() responseData$?: Observable<AllClass[] | undefined>;
  dataEvents?:AllClass[]
  noEvents: boolean = false;
  displayMessage: string = 'ciaooo';


  constructor(private emitterServ:NavbarEventEmitterService){}
  ngOnInit(): void {
    this.emitterServ.responseData$.subscribe((response)=>{
      this.dataEvents = response
      console.log(this.dataEvents);

        if(this.dataEvents.length===0){
          this.noEvents = true
          //this.displayMessage = 'ciaooo';
          console.log(this.displayMessage);


        }
        else{
        this.noEvents = false
      }

    })
  }


}
