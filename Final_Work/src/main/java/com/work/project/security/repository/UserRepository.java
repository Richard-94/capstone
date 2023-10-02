package com.work.project.security.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.work.project.security.entity.User;
import com.work.project.security.model.UserEvent;
import com.work.project.security.payload.UserDto;

public interface UserRepository extends JpaRepository<User, Long>  {
	  Optional<User> findByEmail(String email);

	    Optional<User> findByUsernameOrEmail(String username, String email);

	    
	    Optional<User> findByUsername(String username);
		   
	    User findById(Integer integer);
	   
	 
	   
	    
	    Boolean existsByUsername(User string);

	    Boolean existsByUsername(String string);

	    Boolean existsByEmail(String email);

		Boolean existsByTelephone(String telephone);

		Optional<User> findUserWithCreatedEventsByUsername(String username);

		//User existById(Integer userId);

		

	

}
