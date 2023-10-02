package com.work.project.security.model;

import java.util.ArrayList;
import java.util.List;

import com.work.project.security.constants.Animations;
import com.work.project.security.constants.Games;
import com.work.project.security.constants.InteractiveActivities;
import com.work.project.security.constants.Theme;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class ChildrenEvents extends Events{
	 @Enumerated(EnumType.STRING)
	    @ElementCollection(targetClass = Theme.class)
	    @JoinTable(name = "theme_event", joinColumns = @JoinColumn(name = "event_id"))
	 private List<Theme>themes;
	 @Enumerated(EnumType.STRING)
	  @ElementCollection(targetClass = InteractiveActivities.class)
	    @JoinTable(name = "activities_event", joinColumns = @JoinColumn(name = "event_id"))
	 private List<InteractiveActivities> activities;
	 @Enumerated(EnumType.STRING)
	  @ElementCollection(targetClass = Animations.class)
	    @JoinTable(name = "animations", joinColumns = @JoinColumn(name = "event_id"))
	 private List<Animations>animations;
	 @Enumerated(EnumType.STRING)
	  @ElementCollection(targetClass = Games.class)
	    @JoinTable(name = "games", joinColumns = @JoinColumn(name = "event_id"))
	 private List<Games>games;
	 @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	   //@JsonBackReference
	    private List<AgeRange> ageRanges = new ArrayList<>();

}
