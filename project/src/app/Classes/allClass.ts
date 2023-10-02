import { Dietary } from "../Enum/dietary.enum";
import { Disabilities } from "../Enum/disabilities.enum";
import { Drinks } from "../Enum/drinks.enum";
import { FoodCategory } from "../Enum/foodCategory.enum";
import { RecoverId } from "./recoverId";

export class AllClass {
  id?: number;
  title?: string;
  location?: string;
  time?: string; // Rappresenta l'orario come una stringa nel formato "HH:MM:SS"
  surname?: string;
  message?:string
  price?:string | number;
  participants?:number | string;
  disabilities?: Disabilities;
  address?:string;
  region?:string
  description?:string
  province?:string;
  date?:string| undefined;
  favourite?:boolean
  town?:string;
  imageMetadataList?: { filePath: string }[] = [];
  organizer?:string;
  createdByUser?:string
  info_event?:string;
  type_of_sports?:string;
  //disabilities: string | undefined;
  sponsorsList?:{nameSponsor:string,websites:string}[];
  attendants?: RecoverId [];
  eventType?:string;
  drinks?:Drinks[];
  dietaryInfo?:Dietary[];
  foodCategory?:FoodCategory[];




}
