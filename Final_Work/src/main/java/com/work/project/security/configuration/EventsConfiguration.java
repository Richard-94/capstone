package com.work.project.security.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.work.project.security.model.ChildrenEvents;
import com.work.project.security.model.FoodFestivalsEvents;
import com.work.project.security.model.ImageMetadata;
import com.work.project.security.model.Sponsors;
import com.work.project.security.model.SportsEvents;
import com.work.project.security.model.UserEvent;



@Configuration
public class EventsConfiguration {
	@Bean("sports")
	@Scope("prototype")
	public SportsEvents sports() {
		return new SportsEvents();
	}

	@Bean("images")
	@Scope("prototype")
	public ImageMetadata images() {
		return new ImageMetadata();
	}

	@Bean("sponsors")
	@Scope("prototype")
	public Sponsors sponsor() {
		return new Sponsors();
	}
	
	@Bean("foodFestival")
	@Scope("prototype")
	public FoodFestivalsEvents foodFestival() {
		return new FoodFestivalsEvents();
	}
	
	@Bean("childrenEvent")
	@Scope("prototype")
	public ChildrenEvents childrenEvents() {
		return new ChildrenEvents();
	}
	
	@Bean("userEvent")
	@Scope("prototype")
    public UserEvent userEvents() {
		return new UserEvent();
	}
	

}
