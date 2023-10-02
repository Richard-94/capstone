package com.work.project.security.model;

import java.util.List;

import com.work.project.security.constants.DietaryInformation;
import com.work.project.security.constants.Drinks;
import com.work.project.security.constants.FoodCategories;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FoodFestivalsEvents extends Events {

    
    private String parkingNearby;
    @Enumerated(EnumType.STRING)
    @ElementCollection(targetClass = DietaryInformation.class)
    @JoinTable(name = "food_festivals_dietary_info", joinColumns = @JoinColumn(name = "event_id"))
    private List<DietaryInformation> dietaryInfo;

    @Enumerated(EnumType.STRING)
    @ElementCollection(targetClass = Drinks.class)
    @JoinTable(name = "food_festivals_drinks", joinColumns = @JoinColumn(name = "event_id"))
    private List<Drinks> drinks;

    @Enumerated(EnumType.STRING)
    @ElementCollection(targetClass = FoodCategories.class)
    @JoinTable(name = "food_categories", joinColumns = @JoinColumn(name = "event_id"))
    private List<FoodCategories> foodCategory;


    
   

}
