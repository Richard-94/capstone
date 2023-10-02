import { Activities } from "../Enum/activities.enum";
import { Animations } from "../Enum/animations.enum";
import { Disabilities } from "../Enum/disabilities.enum";
import { Games } from "../Enum/games.enum";
import { Themes } from "../Enum/themes.enum";
import { RecoverId } from "./recoverId";

export class Children {
  id?: number;
  title?: string;
  location?: string;
  time?: string; // Rappresenta l'orario come una stringa nel formato "HH:MM:SS"
  surname?: string;
  message?:string
  price?:string | number;
  participants?:number | string;
  // disabilities?: Disabilities;
  address?:string;
  region?:string
  province?:string;
  date: string | undefined;
  description: string | undefined;
  town?:string;
  imageMetadataList?: { filePath: string }[] = [];
  organizer?:string;
  info_event?:string;
  disabilities?: Disabilities;
  sponsorsList?:{nameSponsor:string,websites:string}[];
  attendants?: RecoverId [];
  eventType?:string;
  themes?:Themes[];
  activities?:Activities[];
  animations?:Animations[];
  games?:Games[];
  ageRanges?:{ageRange:string}[]=[];
  createdByUser?:string;
  booked?:boolean
  favourite?:boolean

  childrenEvents!:
    {
    title: string | undefined;
    location: string | undefined;
    time: string | undefined;
    date: string | undefined;
    participants: string | number| undefined;
    address: string | undefined;
    region: string | undefined;
    province: string | undefined;
    town: string | undefined;
    description: string | undefined;
    organizer: string | undefined;
    info_event: string | undefined;
    eventType: string | undefined;
    createdByUser:string | undefined;
    price: string | undefined;
    imageMetadataList?: {filePath: string }[];
    ageRanges?: {ageRange: string }[];
    disabilities?: string | undefined
    sponsorsList?:{nameSponsor:string,websites:string}[];
    themes?: string[];
    activities?:string[]
    games?:string[]

    animations?:string[]

  };

}
