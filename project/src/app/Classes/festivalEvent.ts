import { Dietary } from "../Enum/dietary.enum";
import { Disabilities } from "../Enum/disabilities.enum";
import { Drinks } from "../Enum/drinks.enum";
import { FoodCategory } from "../Enum/foodCategory.enum";
import { RecoverId } from "./recoverId";

export class Festival{
  id?: number | undefined;
  title?: string;
  location?: string;
  time?: string; // Rappresenta l'orario come una stringa nel formato "HH:MM:SS"
  surname?: string;
  message?:string
  price: string | undefined;
  participants?:string
  // disabilities?: Disabilities;
  address?:string;
  region?:string
  province?:string;

  date?:string| undefined;
  description: string | undefined;
  town?:string;
  imageMetadataList?: { filePath: string }[] = [];
  organizer?:string;
  createdByUser?:string
  info_event?:string;
  disabilities?: Disabilities;
  sponsorsList?:{nameSponsor:string,websites:string}[];
  attendants?: RecoverId [];
  eventType?:string;
  drinks?: any
  booked?:boolean
  favourite?:boolean



  dietaryInfo?:Dietary[];
  foodCategory?:FoodCategory[];
  foodEvents!:
    {

    id?: number;

    title: string | undefined;
    location: string | undefined;
    time: string | undefined;
    date: string | undefined;
    participants: string | undefined;
    address: string | undefined;
    region: string | undefined;
    province: string | undefined;
    town: string | undefined;
    createdByUser:string | undefined;
    description: string | undefined;
    organizer: string | undefined;
    info_event: string | undefined;
    eventType: string | undefined;
    price: string | undefined;
    imageMetadataList?: {filePath: string }[];
    disabilities?: string | undefined
    sponsorsList?:{nameSponsor:string,websites:string}[];
    dietaryInfo?: string[];
    foodCategory?:string[]
    drinks?: Drinks[]


  };



}
