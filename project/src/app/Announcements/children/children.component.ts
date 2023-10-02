import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Children } from 'src/app/Classes/children';
import { Province } from 'src/app/Classes/province';
import { ProvinceService } from 'src/app/Data-Services/province.service';
import { ChildrenService } from 'src/app/Data-Services/services/children.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss']
})
export class ChildrenComponent {
  @Input()  responseDataChildren$?: Observable<Children| undefined>;
  showForm?: boolean
  isSendPost: boolean = true;
  error?:Response;
  success:string = ""
  showPassword:boolean = false
  regions: string[] = [];
  provinces: string[] = [];
  comune: string[] = [];
  selectedRegion?: string;
  selectedProvince?: string;
  selectedComune?:string;
  eventType:string[]=["Bambini"];
  animationsList:string[]=["MARIONETTISTI", "ARTISTI_DI_STRADA", "MAGIC_SHOW"];
  activitiesList:string[]=["SPETTACOLI_DI_MAGIA", "TRUCCABIMBI", "CACCIA_AL_TESORO" , "LABORATORI_CREATIVI"];
  themesList:string[]=["CIRCO", "PIRATI", "FAVOLE","CARNEVALE", "SUPEREROI"];
  gamesList:string[]=["SCIVOLI", "ALTALENE", "GONFIABILI","GIOCHI_DA_TAVOLO"];
  disabilities:string[]=["Si", "No"]
  selectedEvent?:string;
  selectedType?:string
  selectedDisabilities?:string
  selectedSport?:string
  themes = new FormControl([],Validators.required);
  activities = new FormControl([],Validators.required);
  games= new FormControl([],Validators.required);
  animations= new FormControl([],Validators.required);
  childrenEvent: Children= new  Children();
  storedUsername = localStorage.getItem('username');





  constructor(private province:ProvinceService,private child:ChildrenService) {

  }
  ngOnInit(): void {
    this.getProvince();


    const initialImages = [{ filePath: '' }];
    initialImages.forEach(image => {
      this.addImageMetadata(image);
    });

    const initialSponsors = [{ nameSponsor: '', websites:'' }];
    initialSponsors.forEach(sponsor => {
      this.addSponsors(sponsor);
    });
  }

  myForm= new FormGroup({
    title: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required, Validators.email]),
    date: new FormControl('', [Validators.required, Validators.minLength(8)]),
    participants: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    town: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    organizer: new FormControl('', [Validators.required]),
    info_event: new FormControl('', [Validators.required]),
    eventType: new FormControl('', [Validators.required]),
    games: this. games,
    price: new FormControl('', [Validators.required]),
    animations: this.animations,
    themes: this.themes,
    activities : this.activities ,
    disabilities: new FormControl('', [Validators.required]),
   imageMetadataList: new FormArray([]),
   ageRanges: new FormArray([]),
   sponsorsList:new FormArray([])

  });


  updateUsersDataFromFormValues() {

    const dateValue = this.myForm.value.date;
    const timeValue = this.myForm.value.time; // Get the time value separately

    const formatTime = (timeStr: string) => {
    const timeParts = timeStr.match(/(\d+):(\d+) ([APap][Mm])/); // Match "hh:mm AM/PM" format

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
      console.log(`Invalid time format: ${timeStr}`);
      return ''; // Return an empty string for invalid formats
    }
  };

  const formValue = this.myForm.value;

  // Add debugging output for the time value
  console.log(`Time from form: ${timeValue}`);

  const formattedTime = formValue.time ? formatTime(formValue.time) : '';
  console.log(`Original time: ${timeValue}, Formatted time: ${formattedTime}`);


    this. childrenEvent. childrenEvents = {
     title: formValue.title || undefined,
      location: formValue.location || undefined,
      time: formattedTime,
      date: dateValue ? new Date(dateValue) : undefined,
      participants: formValue.participants || undefined,
      address: formValue.address || undefined,
      region: formValue.region || undefined,
      province: formValue.province || undefined,
      town: formValue.town || undefined,
      description: formValue.description || undefined,
      organizer: formValue.organizer || undefined,
      disabilities: formValue.disabilities || undefined,
      info_event: formValue.info_event || undefined,
      eventType: formValue.eventType || undefined,
      price: formValue.price || undefined,
      imageMetadataList: formValue.imageMetadataList || undefined,
      ageRanges:formValue.ageRanges || undefined,
      sponsorsList: formValue.sponsorsList || undefined,
      themes: formValue.themes|| undefined,
      activities: formValue.activities || undefined,
      animations: formValue.animations || undefined,
      games: formValue.games || undefined,
      createdByUser:this.storedUsername  || undefined
    };
  }



  onCreatePost() {
    console.log("ciaoo");

     if (this.isSendPost) {
       this.isSendPost = false
       console.log('Form Value:', this.myForm.value);
       this.updateUsersDataFromFormValues();
       this.child.create(this. childrenEvent).subscribe((response) => {
         console.log(response);
         this.isSendPost = true
         this.success = "Welcome please login to continue"
         //this.router.navigate(['/login'])
         // location.reload()
         //this.dialogRef.close();
       },
     (error)=>{
       this.handleServiceError(error);
       console.log(error);

       this.error = error
      this.isSendPost = true;
     }
      );
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
      // Return a default FormControl if the controlName is not recognized
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
       //this.customError = error.message;
       ;

   }


  //  ******************************ADDING AGES *********************************

  getFormControlForAges(ageControl: AbstractControl<any, any>): FormControl {
    const formControl = ageControl.get('ageRange') as FormControl;
    return formControl || new FormControl('');
  }

  addAges() {
    const ageRanges = this.myForm.get('ageRanges') as FormArray;

    if (ageRanges.length < 5) {
      const ageGroup = new FormGroup({
        ageRange: new FormControl('', [Validators.required]),
      });
      ageRanges.push(ageGroup);
    }
  }


  getAges() {
    return (this.myForm.get('ageRanges') as FormArray).controls;
  }

  addAgedata(age: { ageRange: string }) {
    const ageRanges = this.myForm.get('ageRanges') as FormArray;
    const ageGroup = new FormGroup({
      ageRange: new FormControl(age.ageRange || '', [Validators.required]),
    });
    ageRanges.push(ageGroup);
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

}


