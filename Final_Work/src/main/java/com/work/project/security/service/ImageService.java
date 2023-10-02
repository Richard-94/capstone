package com.work.project.security.service;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.work.project.security.model.ImageMetadata;
import com.work.project.security.repository.ImageRepository;

@Service
public class ImageService {
    @Autowired ImageRepository imgRepo;
    @Autowired @Qualifier("images") private ObjectProvider<ImageMetadata> imageProvider;

//    @Transactional
//    public void saveImages(List<ImageMetadata> images) {
//        for (ImageMetadata image : images) {
//            // Set the eventImages reference using the ID of the sports event
//            if (image.getEventImages() != null) {
//                Events sportsEvent = image.getEventImages();
//                image.setEventImages(null); // Clear the eventImages reference to avoid conflicts
//                imgRepo.save(image); // Save the image metadata
//
//            }
//        }
//    }
}









