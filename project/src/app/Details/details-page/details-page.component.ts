import { AuthService } from './../../Data-Services/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './../../Data-Services/services/details.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Festival } from 'src/app/Classes/festivalEvent';
import { Sports } from 'src/app/Classes/sportEvent';
import { MatDialog } from '@angular/material/dialog';
import { NavbarEventEmitterService } from 'src/app/Event-Emitters-Services/navbar-event-emitter.service';
import { RegisterComponent } from 'src/app/home-navbar/authentication/register/register/register.component';
import { LoginComponent } from 'src/app/home-navbar/authentication/login/login/login.component';
import { Children } from 'src/app/Classes/children';
import { MediaMatcher } from '@angular/cdk/layout';

type EventDetails = Sports | Festival;

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  details?: EventDetails;
  detailsChilden?: Children;
  detailsFood?: Festival;
  username: string = '';
  currentImageIndex: number = 0;
  private intervalId: any;
  aspectRatio: number = (2 / 3) * 100;


  // @HostListener('window:resize', ['$event'])
  // onResize(event: any): void {
  //   // Adjust the aspect ratio based on the window's width
  //   if (window.innerWidth <= 1024) {
  //     this.aspectRatio = (1/1) * 100; // Adjust the aspect ratio for smaller screens
  //   } else {
  //     this.aspectRatio = (7 / 6) * 100; // Reset to the initial aspect ratio for larger screens
  //   }
  // }
  private mobileQueryListener: () => void;
  mobileQuery: MediaQueryList | null = null;

  constructor(
    private route: ActivatedRoute,
    private detailsServ: DetailsService,
    public authServ: AuthService,
    public dialog: MatDialog,
    private dialogService: NavbarEventEmitterService,
    private mediaMatcher: MediaMatcher
  ) {
    this.mobileQueryListener = () => {
      this.handleScreenSizeChange();
    };
  }

  ngOnInit(): void {
    this.mobileQuery = this.mediaMatcher.matchMedia('(max-width: 1146px)');
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.startImageCycling();
    const storedUsername = localStorage.getItem('username');
    if (storedUsername !== null) {
      this.username = storedUsername;
    }
    this.getSingleEvent();
  }

  getSingleEvent() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      const typeParam = params.get('type');

      if (idParam !== null && typeParam !== null) {
        const id = +idParam;
        const type = typeParam;
        const apiUrl = `http://localhost:8083/api/events/${type}/${id}`;
        console.log(type);


        if(type ==='sports'){
          this.detailsServ.getEventsByTypeSport(type, id).subscribe((response) => {
            this.details = response;
            console.log('Fetched Details:', this.details);
          });
        }else if(type ==='children'){
          this.detailsServ.getEventsByTypeChildren(type, id).subscribe((response) => {
            this.detailsChilden = response;
            console.log('Fetched Details:',this.detailsChilden );
          });
        }else if(type ==='food'){
          this.detailsServ.getEventsByTypeFestival(type, id).subscribe((response) => {
            this.detailsFood = response;
            console.log('Fetched Details:',this.detailsFood);
          });
        }


      } else {
        console.log('No route parameters available.');
      }
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, isRegister: boolean): void {
    if (isRegister) {
      this.dialog.open(LoginComponent, {
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    } else {
      this.dialog.open(RegisterComponent, {
        width: '500px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  }

  getBackgroundImage(): string {
    // Check if the filePath property exists within details
    if (this.details && this.details.imageMetadataList && this.details.imageMetadataList[0]?.filePath) {
      let url = 'url(' + this.details.imageMetadataList[0]?.filePath + ')';
      console.log(url);
      return url;
    } else {
      // Return 'none' or a default image URL if needed
      return 'none';
    }
  }

  startImageCycling(): void {
    // Set an interval to cycle through images automatically (e.g., every 5 seconds)
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 6000);
  }

  nextImage(): void {
    if (this.details && Array.isArray(this.details.imageMetadataList)) {
      if (this.currentImageIndex < this.details.imageMetadataList.length - 1) {
        this.currentImageIndex++;
      } else {
        // Reset to the first image when reaching the end
        this.currentImageIndex = 0;
      }
    }
  }

  stopImageCycling(): void {
    clearInterval(this.intervalId);
  }


  handleScreenSizeChange(): void {
    if (this.mobileQuery) {
      if (this.mobileQuery.matches) {
        // Deactivate image cycling when the media query matches (e.g., on small screens)
        this.stopImageCycling(); // You need to implement the stopImageCycling method
      } else {
        // Activate image cycling when the media query doesn't match (e.g., on larger screens)
        this.startImageCycling();
      }
    }
  }

  ngOnDestroy(): void { // Corrected the case of 'OnDestroy'
    // Remove the listener and stop image cycling when the component is destroyed
    this.mobileQuery?.removeEventListener('change', this.mobileQueryListener); // Added '?'
    this.stopImageCycling(); // You need to implement the stopImageCycling method
  }
}
