package com.work.project.security.payload;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.work.project.security.constants.Accessibility;
import com.work.project.security.entity.User;
import com.work.project.security.model.ImageMetadata;
import com.work.project.security.model.Sponsors;

import ch.qos.logback.core.spi.ConfigurationEvent.EventType;
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
public class EventsDto<T> {
	private String title;
	private String location;
	private LocalTime time;
	private LocalDate date;
	private String price;
	private String participants;
	private String address;
	private List<ImageMetadata> imageMetadataList = new ArrayList<>(5);
	private String description;
	private String organizer;
	private String region;
	private String province;
	private String town;
	private String info_event;
	private boolean isFavourite;
	 private boolean isBooked;
    @JsonAlias("createdByUser")
    private String createdByUsername;
	

	private Accessibility disabilities;
	private EventType eventType;
	private List<Sponsors>sponsorsList = new ArrayList<>(5);
	
	public String getCreatedByUsername() {
        return createdByUsername;
    }

    public void setCreatedByUsername(String createdByUsername) {
        this.createdByUsername = createdByUsername;
    }
	
}
