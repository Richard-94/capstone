package com.work.project.security.service;
import com.work.project.security.model.UserEvent;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.work.project.security.checking.EventsControl;
import com.work.project.security.creation.CreateEvents;
import com.work.project.security.entity.User;
import com.work.project.security.exception.NotNullException;
import com.work.project.security.model.Events;
import com.work.project.security.model.SportsEvents;
import com.work.project.security.payload.EventsDto;
import com.work.project.security.payload.UserDto;
import com.work.project.security.repository.SportsEventsRepository;
import com.work.project.security.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class SportService {
	private static final Logger logger = LoggerFactory.getLogger(SportService.class);
    @Autowired SportsEventsRepository sportsRepo;
    @Autowired @Qualifier("sports") private ObjectProvider<SportsEvents> sportsProvider;
    @Autowired EventsControl eventcontrol;
    @Autowired UserRepository useRepo;
    @Autowired CreateEvents creatEvents;
  
    
  
    @Transactional
    public SportsEvents createEvent(EventsDto eventDto, String type_of_sports) {
        // Use the sportsProvider to get an instance of SportsEvents
        SportsEvents sports = sportsProvider.getObject();

        // Create a new sports event using the CreateEvents component
        EventsDto createdEvent = creatEvents.createEvent(eventDto);
        sports.setType_of_sports(type_of_sports);

        // Ottieni l'username dall'oggetto eventDto
        String username = eventDto.getCreatedByUsername();

        Optional<User> userOptional = useRepo.findByUsername(username);
        User user = userOptional.orElse(null);

        if (user != null) {
            // Associa l'utente all'evento tramite UserEvent
            UserEvent userEvent = new UserEvent();
            userEvent.setUser(user);
            userEvent.setEvent(sports);

            // Imposta l'username nell'oggetto SportsEvents
            sports.setCreatedByUser(username);

            // Salva l'evento e la relazione UserEvent
            sports.getUserEvents().add(userEvent);
            sports = sportsRepo.save(sports);

            return sports;
        } else {
            // User not found for the provided username
            throw new EntityNotFoundException("User not found for username: " + username);
        }
    }



	public SportsEvents saveSports(SportsEvents sport) {
        try {
            if (sport == null) {
                throw new IllegalArgumentException("Sports  object cannot be null.");
            }
            eventcontrol.controlNotNull(sport);
           
            return sportsRepo.save(sport);
        } catch (IllegalArgumentException e) {
            throw new NotNullException("Sport event is not valid for saving: " + e.getMessage());
        }
    }

	 public List<SportsEvents> getAllEvents() {
	    	List <SportsEvents> sport =  (List<SportsEvents>) sportsRepo.findAll();
	    	return sport;
	    }

	 public SportsEvents findSport(Long id) {
	    	if(!sportsRepo.existsById(id)) {
	    		throw new EntityNotFoundException("No sport activity available at this moment!!!");
	    	}
	    	return sportsRepo.findById(id).get();

	    }
	 
	 public SportsEvents updateSportEvent(Long id, SportsEvents sport) {
			if(!sportsRepo.existsById(id)) {
				throw new EntityNotFoundException("Worker not exists!!!");
			}

			return sportsRepo.save(sport);
		}


}



















//@GetMapping("/town/{townName}")
//@PreAuthorize("permitAll()")
//public ResponseEntity<List<Events>> getTownEvents(@PathVariable String townName) {
//	 try {
//	        String encodedTownName = URLEncoder.encode(townName, "UTF-8");
//	        List<Events> userEvents = (List<Events>) eveService.findByTown(encodedTownName);
//	        ResponseEntity<List<Events>> responseEntity = new ResponseEntity<>(userEvents, HttpStatus.OK);
//	        return responseEntity;
//	    } catch (UnsupportedEncodingException e) {
//	        e.printStackTrace();
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//	    }
//}
//




//
//
//{
//	  "title": "Sample Sports Event",
//	  "location": "Sample Location",
//	  "time": "13:00:00",
//	  "date": "2023-09-10",
//	  "price": "Free",
//	  "participants": "100",
//	  "address": "123 Sample Street",
//	  "description": "A sample sports event description.",
//	  "organizer": "Sample Organizer",
//	  "info_event": "Sample event information",
//	  "disabilities": "PHYSICAL",
//	  "sponsors": [
//	    {
//	      "name": "Sponsor 1",
//	      "description": "Description of Sponsor 1"
//	    },
//	    {
//	      "name": "Sponsor 2",
//	      "description": "Description of Sponsor 2"
//	    }
//	  ],
//	  "imageMetadataList": [
//	    {
//	      "fileName": "image1.jpg",
//	      "filePath": "/images/image1.jpg"
//	    },
//	    {
//	      "fileName": "image2.jpg",
//	      "filePath": "/images/image2.jpg"
//	    }
//	  ]
//	}

//{
//	   "sports":{
//
//	  "title": "Sample Sports Event",
//	  "location": "Sample Location",
//	  "time": "13:00:00",
//	  "date": "2023-09-10",
//	  "price": "Free",
//	  "participants": "100",
//	  "address": "123 Sample Street",
//	  "description": "A sample sports event description.",
//	  "organizer": "Sample Organizer",
//	  "info_event": "Sample event information",
//	  "disabilities": "PHYSICAL",
//	  "sponsors": [
//	    {
//	      "name": "Sponsor 1",
//	      "description": "Description of Sponsor 1"
//	    },
//	    {
//	      "name": "Sponsor 2",
//	      "description": "Description of Sponsor 2"
//	    }
//	  ],
//	  "imageMetadataList": [
//	    {
//	      "fileName": "image1.jpg",
//	      "filePath": "/images/image1.jpg"
//	    },
//	    {
//	      "fileName": "image2.jpg",
//	      "filePath": "/images/image2.jpg"
//	    }
//	  ]
//	   }
//
//
//	}

