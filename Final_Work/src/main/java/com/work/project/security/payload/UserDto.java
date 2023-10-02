package com.work.project.security.payload;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

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
public class UserDto {
	private String username;

}
