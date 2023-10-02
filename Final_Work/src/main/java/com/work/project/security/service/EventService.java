package com.work.project.security.service;

import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.work.project.security.constants.EventType;
import com.work.project.security.model.Events;
import com.work.project.security.model.SportsEvents;
import com.work.project.security.model.UserEvent;
import com.work.project.security.repository.EventsRepository;
import com.work.project.security.repository.UserEventRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
@Service
public class EventService {
	@Autowired EventsRepository eventsRepo;
	@Autowired UserEventRepository userEventsRepo;
	

	public List<Events> getAllEvents(){
		List<Events> u = (List<Events>) eventsRepo.findAll();
		return u;
	}
	

	 public List<Events>findEventCreator(String username) {
	    	if(!eventsRepo.existsByCreatedByUser(username)) {
	    		throw new EntityNotFoundException("No sport activity available at this moment!!!");
	    	}
	    	return (List<Events>) eventsRepo.findByCreatedByUser(username);

	    }
	 
	 public List<Events>findByTownOrRegion(String town, String region) {
	    	if(!eventsRepo.existsByTown(town)) {
	    		throw new EntityNotFoundException("Non ci sono eventi per questa città");
	    	}
	    	return (List<Events>) eventsRepo.findByTownOrRegion(town,region);

	    }
	 
		public ResponseEntity<String> eventDel(Long id) {
		    if (!eventsRepo.existsById(id)) {
		        throw new EntityNotFoundException("User not exists!!!");
		    }
		    Optional<Events> eventToCancel = eventsRepo.findById(id);
		    List<UserEvent> userEventsToDelete = userEventsRepo.findByEvent(eventToCancel);
		    for (UserEvent userEvent : userEventsToDelete) {
		        userEventsRepo.delete(userEvent);
		    }
		    
		    
		    
		    eventsRepo.deleteById(id);
		    return new ResponseEntity<>("Worker deleted", HttpStatus.OK);
		}
		
		public List<Events> findByCriteria(String criteria) {
		    // Create a Specification to build the query dynamically
		    Specification<Events> spec = (root, query, builder) -> {
		        List<Predicate> predicates = new ArrayList<>();

		        // Check if the criteria matches an EventType enum
		        try {
		            EventType eventType = EventType.valueOf(criteria);
		            predicates.add(builder.equal(root.get("eventType"), eventType));
		        } catch (IllegalArgumentException e) {
		            // If the criteria is not a valid enum, treat it as a string
		            predicates.add(builder.or(
		                builder.equal(root.get("town"), criteria),
		                builder.equal(root.get("region"), criteria),
		                builder.equal(root.get("type_of_sports"), criteria)
		            ));
		        }

		        // Combine the conditions with an OR
		        return builder.or(predicates.toArray(new Predicate[0]));
		    };

		    // Execute the query using the created Specification
		    List<Events> events = eventsRepo.findAll(spec);

		    return events;
		}

	


}
