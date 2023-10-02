package com.work.project.security.checking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.work.project.security.entity.User;
import com.work.project.security.exception.MyAPIException;
import com.work.project.security.exception.NotNullException;
import com.work.project.security.model.ChildrenEvents;
import com.work.project.security.model.Events;
import com.work.project.security.model.FoodFestivalsEvents;
import com.work.project.security.model.SportsEvents;
import com.work.project.security.payload.RegisterDto;
import com.work.project.security.repository.UserRepository;

;

@Service
public class EventsControl {
	 @Autowired UserRepository userRepository;
	 
	 public Object controlNotNull(Events event) {

		    if (event.getAddress() == null) {
		        throw new NotNullException("Address field cannot be empty.");
		    }
		  
//		    if(user==null) {
//		    	throw new NotNullException("Username is not availble");
//		    }
//		    
		    if ((event.getDate() == null) || (event.getDescription() == null)) {
		        throw new NotNullException("Il campo data deve essere inserita");
		    }
		    if (event.getDisabilities() == null) {
		        throw new NotNullException("Specificare se è adatto ai disabili");
		    }
		    if (event.getInfo_event() == null) {
		        throw new NotNullException("Inserire un informazione generale dell'evento");
		    }
		    if (event.getImageMetadataList() == null) {
		        throw new NotNullException("Inserire almeno un immagine");
		    }
		    if (event.getProvince() == null) {
		        throw new NotNullException("Specificare la provincia");
		    }
		    if (event.getRegion() == null) {
		        throw new NotNullException("Specificare la regione");
		    }
		    if (event.getTown() == null) {
		        throw new NotNullException("Specificare il paese/città");
		    }


		    if (event.getImageMetadataList().size() > 5) {
		        throw new NotNullException("Puoi inserire fino ad un massimo di 5 immagini");
		    }
		    if (event.getSponsorsList().size() > 5) {
		        throw new NotNullException("Puoi inserire fino ad un massimo di 5 sponsor");
		    }
		    if (event.getLocation() == null) {
		        throw new NotNullException("Specificare la location dove si terrà l'evento");
		    }
		    if (event.getOrganizer() == null) {
		        throw new NotNullException("Indicare l'organizatore");
		    }
		    if (event.getParticipants() == null) {
		        throw new NotNullException("Specificare il numero di partecipanti altrimenti illimitati");
		    }
		    if (event.getPrice() == null) {
		        throw new NotNullException("Indicare il prezzo per lingresso, altrimenti specificare cge è gratis");
		    }
		    if (event.getSponsorsList().isEmpty()) {
		       return ("Non ci sono sponsor per questo evento");
		    }
		    if (event.getTime() == null) {
			    return ("Inserire l'ora dell'evento");
			}
		    if (event.getTitle().isEmpty() || event.getTitle().isEmpty()) {
			       return ("Dare un titolo all'evento");
			}
		   

		    if (event instanceof SportsEvents) {
	            SportsEvents sports = (SportsEvents) event;
	            if (sports.getType_of_sports() == null) {
	                throw new NotNullException("Specificare il tipo di sport");
	            }
	        } else if (event instanceof FoodFestivalsEvents) {
	            FoodFestivalsEvents food = (FoodFestivalsEvents) event;
	            if (food.getFoodCategory() == null) {
	                throw new NotNullException("Specificare le categorie di cibo dell'evento");
	            }
	            if (food.getDietaryInfo() == null) {
	                throw new NotNullException("Specificare se l'evento è adatto a vegani, vegetariani o tutti");
	            }
	            if (food.getDrinks() == null) {
	                throw new NotNullException("Specificare che tipo di bevande veranno servite all'evento, se alcoholici,non alcoholici o entrambi");
	            }
	            if (food.getFoodCategory() == null) {
	                throw new NotNullException("Specificare la lista di cibi che verrano serviti all'evento");
	            }
	        }
	        else if(event instanceof ChildrenEvents) {
	        	ChildrenEvents children =  (ChildrenEvents) event;
	        	if (children.getActivities() == null) {
	                throw new NotNullException("Indicare le attività che si teranno all'evento");
	            }
	        	if (children.getAgeRanges() == null) {
	                throw new NotNullException("Specificare le varie età per questo evento");
	            }
	        	if (children.getAnimations() == null) {
	                throw new NotNullException("Specificare se ci sanno qualche animazione durante l'evento");
	            }
	        	if (children.getThemes() == null) {
	                throw new NotNullException("Specificare il tema dell'evento");
	            }
	        }
	       
			return event;

	 }

	 public RegisterDto registerAndCheck(RegisterDto registerDto) {
		 // add check for username exists in database
	        if(userRepository.existsByUsername(registerDto.getUsername())){
	            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Username already exists!.");
	        }

	        // add check for email exists in database
	        if(userRepository.existsByEmail(registerDto.getEmail())){
	            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Email  already exists!.");
	        }
	        if(userRepository.existsByTelephone(registerDto.getTelephone())){
	            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Telephone  already exists!.");
	        }


	        // add check for secretCode exists in database
//	        if(userRepository.existsBySecretCode(registerDto.getSecretCode())){
//	            throw new MyAPIException(HttpStatus.BAD_REQUEST, "SecretCode is already exists!.");
//	        }
//
//	        if(userRepository.existsByTelephone(registerDto.getTelephone())) {
//	        	 throw new MyAPIException(HttpStatus.BAD_REQUEST, "Telephone number  already exists!.");
//	        }

	        if(registerDto.getName()==null) {
	        	throw new NotNullException("Name cannot be empty");
	        }


	        if(registerDto.getAddress()==null) {
	        	throw new NotNullException("Address field cannot be empty");
	        }

	        if(registerDto.getEmail()==null) {
	        	throw new NotNullException("Email cannot be empty");
	        }

	        if(registerDto.getPassword()==null) {
	        	throw new NotNullException("Password cannot be empty");
	        }

	        if(registerDto.getTelephone()==null) {
	        	throw new NotNullException("Telephone cannot be empty");
	        }

	        if(registerDto.getUsername()==null) {
	        	throw new NotNullException("Username cannot be empty");
	        }
	        return registerDto;
	 }

}


