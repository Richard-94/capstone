package com.work.project.security.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.work.project.security.constants.Accessibility;
import com.work.project.security.constants.EventType;



import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public abstract class Events {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    @Column(nullable = false)
    private String title;
    private boolean isFavourite;
    private boolean isBooked;
    @Column(nullable = false)
    private  String location;
    @Column(nullable = false)
    private LocalTime time;
    @Column(nullable = false)
    private LocalDate date;
    @Column(nullable = false)
    private String price;
    @Column(nullable = false)
    private String participants;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String region;
    @Column(nullable = false)
    private String province;
    @Column(nullable = false)
    private String town;
    @ManyToMany(cascade = CascadeType.ALL,  fetch = FetchType.EAGER)
    private List<ImageMetadata> imageMetadataList = new ArrayList<>(5);
    @Column(nullable = false,columnDefinition = "TEXT")
    private String description;
    @Column(nullable = false)
    private String organizer;
    @Column(nullable = false,columnDefinition = "TEXT")
    private String info_event;
    @Enumerated(EnumType.STRING)
    private EventType eventType;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Accessibility disabilities;
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Sponsors>sponsorsList = new ArrayList<>(5);
    private String createdByUser;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<UserEvent> userEvents= new ArrayList<>();
   
}
