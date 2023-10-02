import { SportService } from './../../../Data-Services/services/sport.service';
import { Component, EventEmitter, Input, NgZone } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminComponent } from 'src/app/Admin/admin/admin.component';
import { Province } from 'src/app/Classes/province';
import {  Sports } from 'src/app/Classes/sportEvent';
import { ProvinceService } from 'src/app/Data-Services/province.service';
import { RegionService } from 'src/app/Data-Services/services/region.service';
import { UpdateService } from 'src/app/Data-Services/services/update.service';

@Component({
  selector: 'app-sports-events',
  templateUrl: './sports-events.component.html',
  styleUrls: ['./sports-events.component.scss']
})
export class SportsEventsComponent {
  @Input() responseModify$?: Observable<boolean | undefined>;
  @Input() responseData$?: Observable<Sports | undefined>;
  responseData: Sports = new Sports();
  modifyEvent:boolean = true;
  viewMode:string = 'map'

  showForm?: boolean
  sportsEvents: Sports= new  Sports();
  isSendPost: boolean = true;
  error?:Response;
  success:string = ""
  showPassword:boolean = false
  regions: string[] = []; // Array to store unique regions
  provinces: string[] = []; // Array to store unique provinces
  comune: string[] = [];
  selectedRegion?: string;
  selectedProvince?: string;
  selectedComune?:string;
  eventType:string[]=["Sport"];
  type_of_sports:string[]=["Football","Maratona","Nuoto","Ciclismo"];
  disabilities:string[]=["Si", "No"]
  selectedEvent?:string;
  selectedType?:string
  selectedDisabilities?:string
  selectedSport?:string
 storedUsername = localStorage.getItem('username');
 modifyTrue?:boolean



  constructor(private province:ProvinceService,private sportServ:SportService,private updateServ:UpdateService,private ngZone: NgZone,
    private adminComponent: AdminComponent) {}
  ngOnInit(): void {
    this.getProvince();

    this.adminComponent.truthyData.subscribe((modify: boolean | undefined) => {
      if (modify !== undefined) {
        // Use the modify value here
        this.modifyTrue=modify
        console.log('Modify value:', modify);
      }
    });
    const initialImages = [{ filePath: '' }];
    initialImages.forEach(image => {
      this.addImageMetadata(image);
    });

    const initialSponsors = [{ nameSponsor: '', websites:'' }];
    initialSponsors.forEach(sponsor => {
      this.addSponsors(sponsor);
    });



    if (this.responseData$) {
      this.responseData$.subscribe((response) => {
        if (response) {
          const dateValue = this.myForm.value.date;
          this.responseData = response
          console.log('Received the responseSuccess event' + this.responseData);
          //console.log('items to modify' + this.modify);
          //this. modifyTrue= true;

          if (this.responseData) {
            if (!this.responseData.imageMetadataList) {
              this.responseData.imageMetadataList = [];
            }
            console.log(this.responseData.title);

            this.myForm.patchValue({
              title: this.responseData.title || '',
              location: this.responseData.location || '',
              date: this.responseData.date || '',
              participants: this.responseData.participants || '',
              address: this.responseData.address || '',
              region: this.responseData.region || '',
              province: this.responseData.province || '',
              time:this.responseData.time || '',
              town: this.responseData.town || '',
              description: this.responseData.description || '',
              type_of_sports:this.responseData.type_of_sports || '',
              organizer:this.responseData.organizer || '',
              disabilities: this.responseData?.disabilities?.toString() || '',

              info_event:this.responseData.info_event || '',
              eventType: this.responseData.eventType || '',
              price:this.responseData.price || '',
              imageMetadataList:[],
              sponsorsList:[],



            });

            // Rimuovi tutti gli elementi esistenti da imageMetadataListArray e sponsorsListArray
            const imageMetadataListArray = this.myForm.get('imageMetadataList') as FormArray;
            while (imageMetadataListArray.length !== 0) {
              imageMetadataListArray.removeAt(0);
            }

            const sponsorsListArray = this.myForm.get('sponsorsList') as FormArray;
            while (sponsorsListArray.length !== 0) {
              sponsorsListArray.removeAt(0);
            }

            // Aggiungi nuovi elementi a imageMetadataListArray e sponsorsListArray
            if (this.responseData.imageMetadataList) {
              this.responseData.imageMetadataList.forEach(image => {
                const imageFormGroup = new FormGroup({
                  filePath: new FormControl(image.filePath),
                  // Aggiungi altre proprietà dell'oggetto image qui se necessario
                });
                imageMetadataListArray.push(imageFormGroup);
              });
            }

            if (this.responseData.sponsorsList) {
              this.responseData.sponsorsList.forEach(sponsor => {
                const sponsorFormGroup = new FormGroup({
                  nameSponsor: new FormControl(sponsor.nameSponsor),
                  websites: new FormControl(sponsor.websites),
                  // Aggiungi altre proprietà dell'oggetto sponsor qui se necessario
                });
                sponsorsListArray.push(sponsorFormGroup);
              });
            }
          } else {
            console.log('Il campo sportsEvents o i dati sono indefiniti.');
          }
        }
      });
    }
  }


  myForm= new FormGroup({
    title: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required, Validators.email]),
    date: new FormControl('', [Validators.required, Validators.minLength(8)]),
    participants: new FormControl('', [Validators.required, Validators.pattern("[0-9-]+")]),
    address: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    town: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    organizer: new FormControl('', [Validators.required]),
    info_event: new FormControl('', [Validators.required]),
    eventType: new FormControl('', [Validators.required]),
    type_of_sports: new FormControl('', [Validators.required]),
   price: new FormControl('', [Validators.required]),
   disabilities: new FormControl('', [Validators.required]),
   imageMetadataList: new FormArray([]),
   sponsorsList:new FormArray([])

  });


  formattedTime(timeValue: string): string | undefined {
    const timeParts = timeValue.match(/(\d+):(\d+) ([APap][Mm])/); // Match "hh:mm AM/PM" format

    if (timeParts && timeParts.length === 4) {
      const hours = parseInt(timeParts[1]);
      const minutes = parseInt(timeParts[2]);
      const isPM = timeParts[3].toLowerCase() === 'pm';

      let formattedHours = hours;
      if (isPM && hours !== 12) {
        formattedHours += 12;
      } else if (!isPM && hours === 12) {
        formattedHours = 0;
      }

      return `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
    } else {
      console.log(`Invalid time format: ${timeValue}`);
      return undefined; // Return undefined for invalid formats
    }
  }

  updateUsersDataFromFormValues() {
    const formValue = this.myForm.value;
    const timeValue = formValue.time || ''; // Get the time value separately
    const formattedTime = this.formattedTime(timeValue);

    const storedUsername = localStorage.getItem('username');

    this.sportsEvents.sportsEvents = {
      title: formValue.title || undefined,
      location: formValue.location || undefined,
      time: formattedTime || undefined,
      date: formValue.date || undefined,
      participants: formValue.participants || undefined,
      address: formValue.address || undefined,
      region: formValue.region || undefined,
      province: formValue.province || undefined,
      town: formValue.town || undefined,
      description: formValue.description || undefined,
      type_of_sports: formValue.type_of_sports || undefined,
      organizer: formValue.organizer || undefined,
      disabilities: formValue.disabilities || undefined,
      info_event: formValue.info_event || undefined,
      eventType: formValue.eventType || undefined,
      price: formValue.price || undefined,
      imageMetadataList: formValue.imageMetadataList || undefined,
      sponsorsList: formValue.sponsorsList || undefined,
      createdByUser: storedUsername || undefined
    };
  }


  onCreatePost() {
    console.log("ciaoo");

    if (this.isSendPost) {
        this.isSendPost = false;

        console.log('Form Value:', this.myForm.value);
        this.updateUsersDataFromFormValues();
        const storedUsername = localStorage.getItem('username');

        if (storedUsername !== null) {

            this.sportServ.create(this.sportsEvents).subscribe((response) => {
                console.log(response);
                this.isSendPost = true;


                console.log('stai modificando?' + this.modifyEvent);

                this.success = "Welcome, please login to continue";
                this.myForm.reset()
            },
            (error) => {
                this.handleServiceError(error);
                console.log(error);
                this.error = error;
                this.isSendPost = true;
            });
        } else {
            console.log('Username is null. Handle this case.');
        }
    }
}


 getProvince() {
  this.province.getAll().subscribe((response: Province[]) => {
    const uniqueRegionsSet = new Set<string>();
    const uniqueProvincesSet = new Set<string>();
    const uniqueComuneSet = new Set<string>();

    response.forEach((province) => {
      const region = province.provincia?.regione || '';
      const provinceName = province.provincia?.nome || '';
      const comuneName = province.nome || '';

      uniqueRegionsSet.add(region);
      uniqueProvincesSet.add(provinceName);
      uniqueComuneSet.add(comuneName);
    });

    this.regions = Array.from(uniqueRegionsSet);
    this.provinces = Array.from(uniqueProvincesSet);
    this.comune = Array.from(uniqueComuneSet);
  });
  }

  // *************************ADDING IMAGES********************

  getFormControlForImage(imageControl: AbstractControl<any, any>): FormControl {
    const formControl = imageControl.get('filePath') as FormControl;
    return formControl || new FormControl('');
  }

  addImages() {
    const imageMetadataList = this.myForm.get('imageMetadataList') as FormArray;

    if (imageMetadataList.length < 5) {
      const imageGroup = new FormGroup({
        filePath: new FormControl('', [Validators.required]),
      });
      imageMetadataList.push(imageGroup);
    }
  }


  getImages() {
    return (this.myForm.get('imageMetadataList') as FormArray).controls;
  }

  addImageMetadata(image: { filePath: string }) {
    const imageMetadataList = this.myForm.get('imageMetadataList') as FormArray;
    const imageGroup = new FormGroup({
      filePath: new FormControl(image.filePath || '', [Validators.required]),
    });
    imageMetadataList.push(imageGroup);
  }

  // *************************ADDING SPONSORS********************

  getFormControlForSponsors(SponsorControl: AbstractControl<any, any>, controlName: string): FormControl {
    const nameSponsorControl = SponsorControl.get('nameSponsor') as FormControl;
    const websiteSponsorControl = SponsorControl.get('websites') as FormControl;

    // Use controlName to determine which control to return
    if (controlName === 'nameSponsor') {
      return nameSponsorControl;
    } else if (controlName === 'websites') {
      return websiteSponsorControl;
    } else {
      return new FormControl('');
    }
  }


  addSponsorsList() {
    const sponsorsList = this.myForm.get('sponsorsList') as FormArray;

    if (sponsorsList.length < 5) {
      const sponsorGroup = new FormGroup({
        nameSponsor: new FormControl('', [Validators.required]),
        websites: new FormControl('', [Validators.required]),
      });
      sponsorsList.push(sponsorGroup);
    }
  }

  getSponsors() {
    return (this.myForm.get('sponsorsList') as FormArray).controls;
  }


  addSponsors(sponsors: { nameSponsor: string, websites:string }) {
    const SponsorList = this.myForm.get('sponsorsList') as FormArray;
    const sponsorGroup = new FormGroup({
      nameSponsor: new FormControl(sponsors.nameSponsor || '', [Validators.required]),
      websites: new FormControl(sponsors.websites || '', [Validators.required]),
    });
    SponsorList.push(sponsorGroup);
  }

  handleServiceError(error: any) {
    console.log(error);
       this.error = error;

   }


   modifyEventSport(eventType: string, id: number) {
    const formValue = this.myForm.value;
    const timeValue = formValue.time || ''; // Get the time value separately
    const formattedTime = this.formattedTime(timeValue);

    const storedUsername = localStorage.getItem('username');

    if (this.isSendPost) {
      const formValue = this.myForm.value;
      const timeValue = formValue.time || ''; // Get the time value separately
      const formattedTime = this.formattedTime(timeValue);

      const storedUsername = localStorage.getItem('username');
      this.sportServ.getSingleEvent('sports', id).subscribe(existingEvent => {
        console.log(existingEvent);
        console.log(id);

        this.modifyEvent = true

        if (existingEvent) {
          // Creare un oggetto per sportsEvents con i dati dal form
          const sportsEvents = {
            id: id || undefined, // Include the id here
            title: this.myForm.value.title || undefined,
            location: this.myForm.value.location || undefined,
            date: this.myForm.value.date || undefined,
            participants: this.myForm.value.participants || undefined,
            time: formattedTime || undefined,
            address: this.myForm.value.address || undefined,
            region: this.myForm.value.region || undefined,
            province: this.myForm.value.province || undefined,
            town: this.myForm.value.town || undefined,
            description: this.myForm.value.description || undefined,
            type_of_sports: this.myForm.value.type_of_sports || undefined,
            organizer: this.myForm.value.organizer || undefined,
            createdByUser:this.storedUsername  || undefined,
            info_event: this.myForm.value. info_event|| undefined,
            eventType:this.myForm.value.eventType|| undefined,
            price:this.myForm.value.price|| undefined,
            disabilities:this.myForm.value.disabilities || undefined,
            imageMetadataList: this.myForm.value.imageMetadataList || undefined,
            sponsorsList: this.myForm.value.sponsorsList || undefined,

          };

          // Aggiungi sportsEvents all'oggetto existingEvent
          existingEvent.sportsEvents = sportsEvents;

          // Esegui l'operazione di aggiornamento dell'evento esistente
          this.updateServ.update(existingEvent, 'sports', id).subscribe((response) => {
            console.log(id);
            this.myForm.reset()
            console.log('Event updated', response);
            console.log(this.modifyEvent);
          });
        }
      });
    }
  }

  toggleModifyEvent() {
    this.modifyEvent = !this.modifyEvent;
  }


}




