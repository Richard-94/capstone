package com.work.project.security.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.work.project.security.model.UserEvent;
import com.work.project.security.payload.UserEventDto;
import com.work.project.security.repository.EventsRepository;
import com.work.project.security.repository.UserEventRepository;
import com.work.project.security.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

import com.work.project.security.entity.User;

import com.work.project.security.model.Events;

@Service
public class UserEventService {
	@Autowired @Qualifier("userEvent") private ObjectProvider<UserEvent> userEventProvider;
	@Autowired UserRepository userRepo;
	@Autowired EventsRepository eveRepo;
	@Autowired UserEventRepository userEventRepo;
	

	
	public UserEvent createEvent(UserEventDto userDto) {
		User user = userRepo.findById(userDto.getUserId());
		Events event = eveRepo.findById(userDto.getEventId());
		  boolean userHasBookedEvent = userEventRepo.existsByUserAndEvent(user, event);

		    if (userHasBookedEvent) {
		        throw new IllegalArgumentException("Evento gia aggiunto ai preferiti");
		    }
		    Long eventId = event.getId();
		    userDto.setFavourite(true);
		    //event.setFavourite(true);
		    user = userRepo.save(user);
		    event = eveRepo.save(event);
		
		UserEvent newUserEvent = UserEvent.builder()
				.user(user)
				.event(event)
				.id(eventId)
				.isFavourite(true)
			
				.build();	
		return userEventRepo.save(newUserEvent);
		
	}
	

	public List<UserEvent> getAllEvent(){
		List<UserEvent> event = (List<UserEvent>) userEventRepo.findAll();
		return event;
	}
	
	public List<UserEvent> getEventByUsername(String username){
		List<UserEvent> event = (List<UserEvent>) userEventRepo.findByUserUsername(username);
		return event;
	}
	
	

}
