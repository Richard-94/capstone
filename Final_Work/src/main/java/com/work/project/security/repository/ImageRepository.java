package com.work.project.security.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.work.project.security.model.ImageMetadata;

public interface ImageRepository extends CrudRepository<ImageMetadata, Long> {

	List<ImageMetadata> findByEventImagesId(Long eventId);

}
