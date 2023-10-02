import { Children } from "./children";
import { Festival } from "./festivalEvent";
import { Sports } from "./sportEvent";

export class UserEvent {
  id?:number
  eventId?:number;
  userId?:number
  favourite?:boolean
  isActive?: boolean;
  event?: Festival | Sports | Children

}
