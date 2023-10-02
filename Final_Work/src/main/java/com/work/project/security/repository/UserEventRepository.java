package com.work.project.security.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.work.project.security.entity.User;
import com.work.project.security.model.Events;
import com.work.project.security.model.UserEvent;

public interface UserEventRepository extends CrudRepository<UserEvent, Long> {

	 List<UserEvent> findByUserUsername(String username);

	

	boolean existsByUserAndEvent(User user, Events event);



	List<UserEvent> findByEvent(Optional<Events> eventToCancel);



}
