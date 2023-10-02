package com.work.project.security.creation;
import org.springframework.stereotype.Service;

import com.work.project.security.payload.EventsDto;

@Service
public class CreateEvents {
    public EventsDto createEvent(EventsDto eveDto ) {
    	eveDto.setTitle(eveDto.getTitle());
		eveDto.setLocation(eveDto.getLocation());
		eveDto.setTime(eveDto.getTime());
		eveDto.setDate(eveDto.getDate());
		eveDto.setPrice(eveDto.getPrice());
		eveDto.setParticipants(eveDto.getParticipants());
		eveDto.setDescription(eveDto.getDescription());
		eveDto.setOrganizer(eveDto.getOrganizer());
		eveDto.setInfo_event(eveDto.getOrganizer());
		eveDto.setDisabilities(eveDto.getDisabilities());
		eveDto.setImageMetadataList(eveDto.getImageMetadataList());
		eveDto.setSponsorsList(eveDto.getSponsorsList());
		eveDto.setProvince(eveDto.getProvince());
		eveDto.setRegion(eveDto.getRegion());
		eveDto.setTown(eveDto.getTown());
		eveDto.setEventType(eveDto.getEventType());
		eveDto.setFavourite(false);
		
		return eveDto;


    }

    }

	

