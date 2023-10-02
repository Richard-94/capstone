package com.work.project.security.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class SportsEvents extends Events {
	private String type_of_sports;

    //private String createdByUser;

//    public void setCreatedByUser(String createdByUser) {
//        this.createdByUser = createdByUser;
//    }
//
//    public String getCreatedByUser() {
//        return createdByUser;
//    }
}
