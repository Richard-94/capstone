package com.work.project.security.repository;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.CrudRepository;

import com.work.project.security.model.Events;
import com.work.project.security.model.SportsEvents;

public interface EventsRepository extends CrudRepository<Events, Long> {

	boolean existsByCreatedByUser(String username);
	List<Events> findByCreatedByUser(String username);
	boolean existsByTown(String town);
	
	List<Events> findByTownOrRegion(String town, String region);
	List<Events> findAll(Specification<Events> spec);
	Events findById(Integer integer);
	
	

}
