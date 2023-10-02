
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AllClass } from 'src/app/Classes/allClass';
import { RecoverId } from 'src/app/Classes/recoverId';
import { UserEvent } from 'src/app/Classes/userEvent';
import { AuthService } from 'src/app/Data-Services/services/auth.service';
import { DataService } from 'src/app/Data-Services/services/data.service';
import { UserIdService } from 'src/app/Data-Services/services/userId.service';
import { NavbarEventEmitterService } from 'src/app/Event-Emitters-Services/navbar-event-emitter.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() responseDataEvent$?: Observable<UserEvent| undefined>;

  username: string = '';
  user?: RecoverId;
  favouriteEvents:UserEvent[]=[]



  constructor(public authServ: AuthService,
    private dataServ:UserIdService,
    private dialogServ:NavbarEventEmitterService) {}

  ngOnInit(): void {
    // Use the nullish coalescing operator to provide a default value ('' in this case)
    this.username = localStorage.getItem('username') ?? '';
    if (this.username) {
      this.dataServ.getSingle(this.username).subscribe(
        (response:RecoverId) => {

          this.user = response;

          if(response.avatar === null){
            this.user.avatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
          }

          console.log(this.user);

        },
        (error) => {
          // Handle error if needed
          console.error(error);
        }
      );
    }
    this.dialogServ.responseDataEvent$?.subscribe((response)=>{
      if (response) {
        this.favouriteEvents = response;
        console.log(this.favouriteEvents);
      }

    })
  }
}


