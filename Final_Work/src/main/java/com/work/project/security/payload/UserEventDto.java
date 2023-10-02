package com.work.project.security.payload;

import java.time.LocalDate;

import com.work.project.security.entity.User;

import com.work.project.security.model.Events;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserEventDto {
	private Integer userId;
	private Integer eventId;
	private boolean isFavourite;
	private boolean isBooked;
}
