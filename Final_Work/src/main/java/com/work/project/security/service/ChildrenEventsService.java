package com.work.project.security.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.work.project.security.checking.EventsControl;
import com.work.project.security.constants.Animations;
import com.work.project.security.constants.Games;
import com.work.project.security.constants.InteractiveActivities;
import com.work.project.security.constants.Theme;
import com.work.project.security.creation.CreateEvents;
import com.work.project.security.entity.User;
import com.work.project.security.exception.NotNullException;
import com.work.project.security.model.AgeRange;
import com.work.project.security.model.ChildrenEvents;
import com.work.project.security.model.SportsEvents;
import com.work.project.security.model.UserEvent;
import com.work.project.security.payload.EventsDto;
import com.work.project.security.repository.ChildrenEventsRepository;
import com.work.project.security.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ChildrenEventsService {
	@Autowired ChildrenEventsRepository childrenRepo;
	@Autowired @Qualifier("childrenEvent") private ObjectProvider<ChildrenEvents> childrenProvider;
	 @Autowired CreateEvents creatEvent;
	 @Autowired EventsControl eventcontrol;
	   @Autowired UserRepository useRepo;
	
	  
    public ChildrenEvents createEvent(EventsDto eventDto,List<Theme>themes,
    		List<InteractiveActivities> activities,List<Animations>animations,
    		List<Games>games,List<AgeRange> ageRanges,User userId) {
        // Use the sportsProvider to get an instance of SportsEvents
    	ChildrenEvents children = childrenProvider.getObject();
		// Create a new sports event using the CreateEvents component
        EventsDto createdEvent = creatEvent.createEvent(eventDto);
        children.setActivities(activities);
        children.setThemes(themes);
        children.setAnimations(animations);
        children.setGames(games);
        children.setAgeRanges(ageRanges);
        
        String username = eventDto.getCreatedByUsername();
        Optional<User> userOptional = useRepo.findByUsername(username);
        User user = userOptional.orElse(null);

        if (user != null) {
            // Associa l'utente all'evento tramite UserEvent
            UserEvent userEvent = new UserEvent();
            userEvent.setUser(user);
            userEvent.setEvent( children);

            // Imposta l'username nell'oggetto SportsEvents
            children.setCreatedByUser(username);

            // Salva l'evento e la relazione UserEvent
            children.getUserEvents().add(userEvent);
            children = childrenRepo.save( children);
        }
        
        return children;
    }


	public ChildrenEvents saveChildrenEvents(ChildrenEvents children) {
        try {
            if (children == null) {
                throw new IllegalArgumentException("Children Events  object cannot be null.");
            }
            eventcontrol.controlNotNull(children);
            return childrenRepo.save(children);
        } catch (IllegalArgumentException e) {
            throw new NotNullException("Children event is not valid for saving: " + e.getMessage());
        }
    }

	 public List<ChildrenEvents> getAllEvents() {
	    	List <ChildrenEvents> children =  (List<ChildrenEvents>) childrenRepo.findAll();
	    	return children;
	    }

	 public ChildrenEvents findChildrenEvent(Long id) {
	    	if(!childrenRepo.existsById(id)) {
	    		throw new EntityNotFoundException("No children activity available at this moment!!!");
	    	}
	    	return childrenRepo.findById(id).get();

	    }
	 
	 public ChildrenEvents updateChildrenEvent(Long id, ChildrenEvents children) {
			if(!childrenRepo.existsById(id)) {
				throw new EntityNotFoundException("Worker not exists!!!");
			}

			return childrenRepo.save(children);
		}


	

}
