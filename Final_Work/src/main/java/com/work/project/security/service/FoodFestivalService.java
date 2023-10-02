package com.work.project.security.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.work.project.security.checking.EventsControl;
import com.work.project.security.constants.DietaryInformation;
import com.work.project.security.constants.Drinks;
import com.work.project.security.constants.FoodCategories;
import com.work.project.security.creation.CreateEvents;
import com.work.project.security.entity.User;
import com.work.project.security.exception.NotNullException;
import com.work.project.security.model.FoodFestivalsEvents;
import com.work.project.security.model.SportsEvents;
import com.work.project.security.model.UserEvent;
import com.work.project.security.payload.EventsDto;
import com.work.project.security.repository.FoodFestivalEventsRepository;
import com.work.project.security.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class FoodFestivalService {
		@Autowired FoodFestivalEventsRepository foodRepo;
		@Autowired @Qualifier("foodFestival") private ObjectProvider<FoodFestivalsEvents> foodProvider;
	    @Autowired EventsControl eventcontrol;
	    @Autowired CreateEvents creatEvents;
	    @Autowired UserRepository useRepo;
	    
	    public FoodFestivalsEvents createEvent(EventsDto eventDto,List<DietaryInformation>dietaryInfo,
	    		String parkingNearby,List<Drinks> drinks,List<FoodCategories> foodCategory) {
	        // Use the sportsProvider to get an instance of SportsEvents
	    	FoodFestivalsEvents food = foodProvider.getObject();
			// Create a new sports event using the CreateEvents component
	        EventsDto createdEvent = creatEvents.createEvent(eventDto);
	        food.setDietaryInfo(dietaryInfo);
	        food.setDrinks(drinks);
	        food.setParkingNearby(parkingNearby);
	        food.setFoodCategory(foodCategory);
	        String username = eventDto.getCreatedByUsername();
	        Optional<User> userOptional = useRepo.findByUsername(username);
	        User user = userOptional.orElse(null);

	        if (user != null) {
	            // Associa l'utente all'evento tramite UserEvent
	            UserEvent userEvent = new UserEvent();
	            userEvent.setUser(user);
	            userEvent.setEvent(food);

	            // Imposta l'username nell'oggetto SportsEvents
	            food.setCreatedByUser(username);

	            // Salva l'evento e la relazione UserEvent
	            food.getUserEvents().add(userEvent);
	            food = foodRepo.save(food);
	        }
	        
	        
	        
	        return food;
	    }
	        
	        


		public FoodFestivalsEvents saveFoodFestival(FoodFestivalsEvents food) {
	        try {
	            if (food == null) {
	                throw new IllegalArgumentException("Food Festival  object cannot be null.");
	            }
	            eventcontrol.controlNotNull(food);
	            return foodRepo.save(food);
	        } catch (IllegalArgumentException e) {
	            throw new NotNullException("Sport event is not valid for saving: " + e.getMessage());
	        }
	    }

		 public List<FoodFestivalsEvents> getAllEvents() {
		    	List <FoodFestivalsEvents> food =  (List<FoodFestivalsEvents>) foodRepo.findAll();
		    	return food;
		    }

		 public FoodFestivalsEvents findFoodFestival(Long id) {
		    	if(!foodRepo.existsById(id)) {
		    		throw new EntityNotFoundException("No sport activity available at this moment!!!");
		    	}
		    	return foodRepo.findById(id).get();

		    }
		 
		 public FoodFestivalsEvents updateFoodEvent(Long id, FoodFestivalsEvents food) {
				if(!foodRepo.existsById(id)) {
					throw new EntityNotFoundException("Worker not exists!!!");
				}

				return foodRepo.save(food);
			}

	

}
