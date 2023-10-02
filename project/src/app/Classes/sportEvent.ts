import { Disabilities } from "../Enum/disabilities.enum";
import { RecoverId } from "./recoverId";


export class Sports{

  id?: number;
  surname?: string;
  message?:string
  attendants?: RecoverId [];
  price: string | undefined;
  imageMetadataList?: { filePath: string }[] = [];
  eventType?:string
  disabilities: string | undefined;
  sponsorsList?:{nameSponsor:string,websites:string}[];
  town: string | undefined;
  address: string | undefined;
  type_of_sports?:string;
  time: string | undefined;
  region: string | undefined;
  organizer: string | undefined;
  province: string | undefined;
  title: string | undefined;
  date?:string| undefined;
  description?:string
  info_event?: string
  participants?:string
  createdByUser?:string
  location: string | undefined;
  booked?:boolean
  favourite?:boolean



  sportsEvents?:
    {
      id?: number;
      title: string | undefined;
      location: string | undefined;
      time: string | undefined;
      createdByUser:string | undefined;
      date: string | undefined;
      participants: string | undefined;
      address: string | undefined;
      region: string | undefined;
      province: string | undefined;
      town: string | undefined;
      description: string | undefined;
      organizer: string | undefined;
      info_event: string | undefined;
      eventType: string | undefined;
      price: string | undefined;
      imageMetadataList?: {filePath: string }[];
      disabilities: string | undefined;
      sponsorsList?:{nameSponsor:string,websites:string}[];
      type_of_sports?:string | undefined
    };


}
