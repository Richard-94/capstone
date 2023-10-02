import { Component } from "@angular/core";
import { AuthService } from "./Data-Services/services/auth.service";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading:boolean = false
  title = 'project';

  constructor(){}
  ngOnInit(): void {
    // Use setTimeout in the ngOnInit lifecycle hook
    setTimeout(() => {
      this.isLoading = true; // Set isLoading to false after the delay
    }, 2000); // 7000 milliseconds (7 seconds)
  }
}
