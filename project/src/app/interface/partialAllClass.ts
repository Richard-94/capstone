import { RecoverId } from "../Classes/recoverId";
import { Dietary } from "../Enum/dietary.enum";
import { Disabilities } from "../Enum/disabilities.enum";
import { Drinks } from "../Enum/drinks.enum";
import { FoodCategory } from "../Enum/foodCategory.enum";

export interface PartialAllClass {
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
  date: Date | undefined;
  description: string | undefined;
  town?:string;
  imageMetadataList?: { filePath: string }[]
  organizer?:string;
  createdByUser?:string
  info_event?:string;
  disabilities?: Disabilities;
  sponsorsList?:{nameSponsor:string,websites:string}[];
  attendants?: RecoverId [];
  eventType?:string;
  drinks?:Drinks[];
  dietaryInfo?:Dietary[];
  foodCategory?:FoodCategory[];

}













import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";


@Injectable()
export class AuthInterInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the request URL is for the login endpoint
    //console.log('Request URL:', req.url);
    if (req.url.includes('/login') || req.url.includes('/register')) {

      console.log('Skipping interceptor for login/signup request.');
      return next.handle(req);
    }
    if (req.url.includes('/api/events?type=sports')) {
      console.log('Skipping interceptor for a specific endpoint spport.');
      return next.handle(req);
  }
  if (req.url.includes('/api/events?type=food')) {
      console.log('Skipping interceptor for a specific endpoint.');
      return next.handle(req);
  }

  const urlParts = req.url.split('/');
  const idIndex = urlParts.indexOf('id'); // Adjust this based on your URL structure

  if (idIndex !== -1 && idIndex + 1 < urlParts.length) {
    const id = urlParts[idIndex + 1];
    let apiUrl: string = ''; // Dichiarala qui fuori per renderla visibile in tutto il blocco

    let type = 'food'; // Cambia il tipo in base alle tue esigenze

    if (type === 'food') {
      apiUrl = `http://localhost:8083/api/events/food/${id}`;
    } else if (type === 'sport') {
      apiUrl = `http://localhost:8083/api/events/sport/${id}`;
    }

    // Costruisci l'URL API dinamico con l'ID estratto

    // Clona la richiesta e aggiorna l'URL con l'URL dinamico
    const modifiedReq = req.clone({
      url: apiUrl,
    });
    // Pass the modified request to the next interceptor or handler
    return next.handle(modifiedReq);
  } else {
    // Handle the case where no dynamic ID is found (you can customize this)
    console.error('Dynamic ID not found in the request URL.');
    return next.handle(req);
  }

    // For other requests, attach the authorization header with the token
    const token = localStorage.getItem('token');
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Pass the cloned request to the next handler
    return next.handle(authReq);
  }
}


