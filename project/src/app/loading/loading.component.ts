import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],

})
export class LoadingComponent {

  constructor(private route: ActivatedRoute, private router: Router) {
    // The resolver provides a "loading" property in the route's data
    this.route.data.subscribe((data) => {
      if (data['loading']) {
        setTimeout(() => {
          // Navigate to the home page after 7 seconds
          this.router.navigate(['home']);
        }, 2000); // 7000 milliseconds (7 seconds)
      } else {
        // If loading is false, navigate immediately
        this.router.navigate(['/']);
      }
    });
  }
}
