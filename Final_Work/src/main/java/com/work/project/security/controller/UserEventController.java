package com.work.project.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.work.project.security.model.UserEvent;
import com.work.project.security.payload.UserEventDto;
import com.work.project.security.service.UserEventService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/events/user")
public class UserEventController {
	@Autowired UserEventService userService;
	
	
	@GetMapping
	@CrossOrigin(origins = "*", maxAge = 3600)
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<List<UserEvent>> getAllEvent(){
		List<UserEvent>  event = userService.getAllEvent();
		ResponseEntity<List<UserEvent>>u = new ResponseEntity <List<UserEvent>>(event, HttpStatus.OK);
		return u;
		
	}
	
	
	@GetMapping("/find/{username}")
	@CrossOrigin(origins = "*", maxAge = 3600)
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity<List<UserEvent>> getEventsOfUser(@PathVariable String username){
		List<UserEvent>  event = userService.getEventByUsername(username);
		ResponseEntity<List<UserEvent>>u = new ResponseEntity <List<UserEvent>>(event, HttpStatus.OK);
		return u;
		
	}
	
	
	 @PostMapping("/create")
	 @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	    public ResponseEntity<Object> createAllocation(@RequestBody UserEventDto userEventDto) {
	        try {
	        	UserEvent createdEvent= userService.createEvent(userEventDto);
	            return ResponseEntity.ok(createdEvent);
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.badRequest().body(e.getMessage());
	        }
	    }

}
