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

    if (req.url.includes('/api/events?type=children')) {
      console.log('Skipping interceptor for a specific endpoint.');
      return next.handle(req);
    }


   // Check if the request URL contains "type" parameter
   if (req.url.includes('type=')) {
    const urlParts = req.url.split('/');
    const idIndex = urlParts.indexOf('id'); // Adjust this based on your URL structure

    if (idIndex !== -1 && idIndex + 1 < urlParts.length) {
      const id = urlParts[idIndex + 1];
      const typeIndex = urlParts.indexOf('type');

      if (typeIndex !== -1 && typeIndex + 1 < urlParts.length) {
        const type = urlParts[typeIndex + 1];

        // Build the dynamic API URL with the extracted ID and type
        const apiUrl = `http://localhost:8083/api/events/${type}/${id}`;

        // Clone the request and update the URL with the dynamic URL
        const modifiedReq = req.clone({
          url: apiUrl,
        });

        // Pass the modified request to the next interceptor or handler
        return next.handle(modifiedReq);
      }
    }
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








// {
//   "foodEvents": {
//     "title": "Delicious Food And Drink Festival",
//     "location": "Campo sportivo di pordenone",
//     "time": "12:00:00",
//     "date": "2023-11-15",
//     "price": "25.00",
//     "participants": "Tutti",
//     "address": "Via Trieste, 3",
//     "region": "Fruili Venezia Giulia",
//     "province": "Udine",
//     "town": "Pordenone",
//     "imageMetadataList": [
//       {
//         "filePath": "https://images.pexels.com/photos/6232568/pexels-photo-6232568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//       },
//       {
//         "filePath": "https://images.pexels.com/photos/1370387/pexels-photo-1370387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//       },
//       {
//         "filePath": "https://images.pexels.com/photos/3990348/pexels-photo-3990348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//       },
//       {
//         "filePath": "https://images.pexels.com/photos/1436328/pexels-photo-1436328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//       }
//     ],
//     "description": " Unisciti a noi per un fantastico festival del cibo e delle bevande! Questo evento è stato progettato per deliziare i palati di tutti gli amanti del cibo. Sarà un'esperienza culinaria straordinaria, con una vasta selezione di cibi deliziosi e bevande da gustare. Potrai gustare prelibatezze di ogni genere, dai dessert alle pietanze principali, accompagnate da bevande alcoliche. Questo festival del cibo è il luogo ideale per esplorare nuovi sapori e incontrare altri appassionati di cibo. Non importa se sei vegetariano o semplicemente ami il buon cibo, troverai qualcosa di speciale qui.",
//     "organizer": "Food on the road organization",
//     "info_event": " Questo è un evento dedicato a tutti coloro che amano il cibo e le bevande. Che tu sia un vegetariano appassionato o desideri semplicemente assaporare deliziosi piatti e drink, questo festival è aperto a te. Sono disponibili varie opzioni di parcheggio nelle vicinanze, quindi non dovrai preoccuparti di trovare un posto per la tua auto. I nostri sponsor, Sponsor 1 e Sponsor 2, hanno contribuito a rendere possibile questo straordinario festival, e ti invitiamo a visitare i loro stand e a scoprire i loro prodotti.Speriamo di vederti all'evento per una giornata di divertimento culinario e sperimentazione gastronomica!",
//     "eventType": "FOOD_FESTIVAL",
//     "disabilities": "SI",
//     "sponsorsList": [
//       {
//         "nameSponsor": "Skandia",
//         "websites": "https://www.skandia.se/"
//       },
//       {
//         "nameSponsor": "Mcdonals",
//         "websites": "https://www.mcdonalds.it/"
//       },
//        {
//         "nameSponsor": "OLYMPIA FOOD TRUCKS",
//         "websites": "https://www.experienceolympia.com/"
//       }
//     ],
//     "dietaryInfo": ["VEGETARIANI","VEGANI","GLUTEN_FREE"],
//     "parkingNearby": "via santi,2",
//     "drinks": ["ALCOHOLICI","NON_ALCOHOLICI"],
//     "foodCategory": ["DESSERT","BBQ","CIBI_INTERNAZIONALI","CIBO_PICCANTE"]
//   }
// }
