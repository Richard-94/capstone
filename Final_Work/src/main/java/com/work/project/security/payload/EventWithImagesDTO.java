package com.work.project.security.payload;

import java.util.List;

import com.work.project.security.model.ImageMetadata;
import com.work.project.security.model.SportsEvents;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class EventWithImagesDTO {
	 private SportsEvents event;
	    private List<ImageMetadata> images;

}
