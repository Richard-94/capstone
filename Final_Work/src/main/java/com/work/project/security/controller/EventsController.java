package com.work.project.security.controller;


import java.util.List;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.work.project.security.exception.InvalidTypeException;
import com.work.project.security.model.ChildrenEvents;
import com.work.project.security.model.EventWrapper;
import com.work.project.security.model.Events;
import com.work.project.security.model.FoodFestivalsEvents;
import com.work.project.security.model.SportsEvents;
import com.work.project.security.service.ChildrenEventsService;
import com.work.project.security.service.EventService;
import com.work.project.security.service.FoodFestivalService;
import com.work.project.security.service.SportService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/events")
public class EventsController {
	@Autowired SportService sportService;
	@Autowired FoodFestivalService foodService;
	@Autowired EventService eveService;
	@Autowired ChildrenEventsService childServ;

	@GetMapping("/all")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<List<Events>> getEvents(){
		List<Events> users = eveService.getAllEvents();
		ResponseEntity<List<Events>>u = new ResponseEntity <List<Events>>(users, HttpStatus.OK);
		return u;

	}
	
	@GetMapping("/all/{username}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<Events>> getUserEvents(@PathVariable String username) {
	    List<Events> userEvents = (List<Events>) eveService.findEventCreator(username);
	    ResponseEntity<List<Events>> responseEntity = new ResponseEntity<>(userEvents, HttpStatus.OK);
	    return responseEntity;
	}
	
	@GetMapping("/search/{criteria}")
	@PreAuthorize("permitAll")
	public ResponseEntity<List<Events>> searchEvents(@PathVariable String criteria) {
	    List<Events> userEvents = eveService.findByCriteria(criteria);
	    ResponseEntity<List<Events>> responseEntity = new ResponseEntity<>(userEvents, HttpStatus.OK);
	    return responseEntity;
	}


	//http://localhost:8083/api/events?type=sports
	@GetMapping
	@PreAuthorize("permitAll()")
	public ResponseEntity<List<?>> getEvents(@RequestParam(name = "type", required = false) String type) {
	    List<?> events = null;
	    if (type.equalsIgnoreCase("sports")) {
	        events = sportService.getAllEvents();
	    }
	    else if (type.equalsIgnoreCase("food")) {
	        events = foodService.getAllEvents();
	    } 
	    else if (type.equalsIgnoreCase("children")) {
	        events = childServ.getAllEvents();
	    }
	    return new ResponseEntity<>(events, HttpStatus.OK);
	}


	//http://localhost:8083/api/events/sports/1
	@GetMapping("{type}/{id}")
	@CrossOrigin(origins = "*", maxAge = 3600)
	@PreAuthorize("permitAll")
	public ResponseEntity<Events> getGadgetById(@PathVariable String type, @PathVariable Long id){
		Events event = null;
		 if (type.equalsIgnoreCase("sports")) {
		        event =sportService.findSport(id);
		    }
		 else if (type.equalsIgnoreCase("food")) {
		        event = foodService.findFoodFestival(id);
		    } 
		  else if (type.equalsIgnoreCase("children")) {
		  event = childServ.findChildrenEvent(id);

		    }
		    return new ResponseEntity<>(event, HttpStatus.OK);
		}

	//http://localhost:8083/api/events
	@PostMapping
	@CrossOrigin(origins = "*", maxAge = 3600)
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> createGadget(@RequestBody EventWrapper eventWrapper) {
	    if (eventWrapper.getSportsEvents() != null) {
	        SportsEvents sport = eventWrapper.getSportsEvents();
	        SportsEvents sportEve = sportService.saveSports(sport);
	        return new ResponseEntity<>(sportEve, HttpStatus.CREATED);
	    } else if (eventWrapper.getFoodEvents() != null) {
	        FoodFestivalsEvents food = eventWrapper.getFoodEvents();
	        FoodFestivalsEvents foodEve = foodService.saveFoodFestival(food);
	        return new ResponseEntity<>(foodEve, HttpStatus.CREATED);
	    } else if (eventWrapper.getChildrenEvents() != null) {
	    	ChildrenEvents children = eventWrapper.getChildrenEvents();
	    	ChildrenEvents childrenEve = childServ.saveChildrenEvents(children);
	        return new ResponseEntity<>(childrenEve, HttpStatus.CREATED);
	    } 
	    
	    else {
	        throw new InvalidTypeException("Invalid Event type. The type of event must be indicated in the json");
	    }
	}
	
	
	@PutMapping("/{type}/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateEventById(@PathVariable String type, @PathVariable Long id, @RequestBody EventWrapper eventWrapper) {
		Events event = null;
		if (eventWrapper.getSportsEvents() != null) {
	        SportsEvents sports = eventWrapper.getSportsEvents();
	        SportsEvents sport = sportService.updateSportEvent(id, sports);
	        return new ResponseEntity<SportsEvents>(sport, HttpStatus.CREATED);
	    } else if (eventWrapper.getFoodEvents() != null) {
	    	FoodFestivalsEvents l = eventWrapper.getFoodEvents();
	    	FoodFestivalsEvents lb = foodService.updateFoodEvent(id,l);
	        return new ResponseEntity<FoodFestivalsEvents>(lb, HttpStatus.CREATED);
	    }else if(eventWrapper.getChildrenEvents() != null) {
	    	ChildrenEvents s = eventWrapper.getChildrenEvents();
	    	ChildrenEvents sp = childServ.updateChildrenEvent(id,s);
	    	 return new ResponseEntity<ChildrenEvents >(sp, HttpStatus.CREATED);	
	    }
	    else {
	    	throw new InvalidTypeException("Invalid Event type. The type of event must be indicated in the json");
	    }
	}  
	
	
	
	
	
	
	
	
	@DeleteMapping("all/{id}")
	@CrossOrigin(origins = "*", maxAge = 3600)
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<String> delEvent(@PathVariable Long id){
		ResponseEntity<String> msg = eveService.eventDel(id);
		return new ResponseEntity<String>(HttpStatus.OK);

	}


}






//
//{
//	  "foodEvents": 
//	    {
//	  "title": "Delicious Food Festival",
//	  "location": "Downtown Square",
//	  "time": "15:00:00",
//	  "date": "2023-10-15",
//	  "price": "25.00 USD",
//	  "participants": "Food lovers of all ages",
//	  "address": "123 Main Street",
//	  "region": "Central",
//	  "province": "YourProvince",
//	  "town": "YourTown",
//	  "imageMetadataList": [
//	    {
//	      "filePath": "https://example.com/image1.jpg"
//	    },
//	    {
//	      "filePath": "https://example.com/image2.jpg"
//	    }
//	  ],
//	  "description": "Join us for a fantastic food festival!",
//	  "organizer": "Food Festival Organization",
//	  "info_event": "This is a description of the food festival event.",
//	  "eventType": "FESTIVAL",
//	  "disabilities": "SI",
//	  "sponsorsList": [
//	    {
//	      "nameSponsor": "Sponsor 1",
//	      "websites": "Event Sponsor 1"
//	    },
//	    {
//	      "nameSponsor": "Sponsor 2",
//	      "websites": "Event Sponsor 2"
//	    }
//	  ],
//	  "dietaryInfo": ["VEGETARIANI"],
//	  "parkingNearby": "via santi,2",
//	  "drinks": ["ALCOHOLICI"],
//	  "foodCategory": ["DESSERT"]
//	}
//
//	}
